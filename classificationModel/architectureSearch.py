# Author: Austin Stephen
# Date: 04/06/2023
# Purpose: Search for the best architecture of the neural network
import tensorflow as tf
import random
import pandas as pd
from train import evaluateModel
from readData import readData
import time

num_classes = 6

# create dense layers
def createModel():
  # search spaces 
  # learning rate
  # number of dense layers
  denseLayers = random.choice([1, 2, 3, 4, 5])
  # maximum size of the dense layers
  denseSizeMax = random.choice([100, 125, 150, 175, 200, 225, 250, 275, 300, 350, 400, 
                                450, 500, 550, 600, 700, 800, 1000, 1250, 1500, 2000, 4000, 6000, 8000])
  
  learningRate = random.choice([0.00005, 0.00001, 0.000025, 0.00005, 0.000075, 0.0001, 0.00025, 
                                0.00075, 0.001, 0.005])
        
  # Size of the last dense layer
  denseSizeLast = random.choice([10, 20, 30, 40, 50, 60, 75, 100, 200])
  # number of convolutions
  convolutions = random.choice([1, 1, 1, 2, 2, 3])

  # sizes of the convolutions
  convolutionSize = random.choice([70, 60, 50, 40, 30, 20])
  # ammount of random contrast to apply to the images
  randomContrast = random.choice([0.2, 0.1, 0.05])
  randomRot = random.choice([0.05, 0.01, 0])
  dropOutRate = random.choice([0.1, 0.2, 0.3, 0.4, 0.5])
  batchSize = random.choice([16, 32, 64])
  
  params = {'learningRate': learningRate, 'denseLayers': denseLayers, 
            'denseSizeMax': denseSizeMax, 'denseSizeLast': denseSizeLast, 
            'convolutions': convolutions, 'convolutionSize' : convolutionSize, \
            'randomContrast': randomContrast, 'randomRot': randomRot, 
            'dropOutRate': dropOutRate, 'batchSize': batchSize}
      
  
  # inital base model
  model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1.0/255),
    tf.keras.layers.RandomContrast(factor = randomContrast),
    tf.keras.layers.RandomRotation(factor = randomRot)])
  
  # add the convolutions
  for i in range(convolutions):
    size = int(convolutionSize / pow(2, i))
    if(convolutionSize > 10):
      print("Adding CV")
      print("Size, ", size),    
      model.add(tf.keras.layers.Conv2D(size, 3, activation='relu'))
      model.add(tf.keras.layers.MaxPooling2D())

  # Add the dense layers
  for i in range(denseLayers):
    print("Adding Dense")
    size = int(denseSizeMax / pow(2, i))
    # dense layer if it is smaller than the last normal layer
    if denseSizeLast > int(size):
      break
    # else add the layer
    print("size, ", size)
    model.add(tf.keras.layers.Dense(size, activation='relu'))
    model.add(tf.keras.layers.Dropout(dropOutRate, input_shape=(2,)))
    
    
  print("Adding Dense Last Layer", denseSizeLast)
  model.add(tf.keras.layers.Dense(denseSizeLast, activation='relu'))
  
  # add the final output layers
  model.add(tf.keras.layers.Flatten())
  model.add(tf.keras.layers.Dense(num_classes))
  
  # compile the final model
  model.compile(
  optimizer=tf.keras.optimizers.Adam(learning_rate = learningRate),
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'])
  
  return model, params

results = pd.DataFrame({'learningRate': [], 'denseLayers': [], 
                        'denseSizeMax' : [], 'denseSizeLast' : [],
                        'convolutions': [], 'convolutionSize' : [],
                        'randomContrast': [], 'randomRot': [], 
                        'meanAcc': [], 'finished': []})

# number of folds to evaluate the configuration under
folds = 5
# numer of configurations to evaluate
configs = 100

finished = False

for paramConfig in range(configs):
  
# same splits
  # create model
  model, params = createModel()
  accumAcc = 0

  # Evaluate model for each fold
  for resamp in range(folds):
    # time
    runTime = 0
    
    # record time for a fold
    start_time = time.time()
    
    # get new train test split
    trainDS, testDS= readData(params['batchSize'], resamp)
    
    # if first iteration less than 55% accuracy don't continue
    if resamp == 1 and (accumAcc < 0.50 and runTime < 300) or (accumAcc < 0.55 and runTime > 300):
      print("Stopping resampling after 1 iteration")
      finished = False
      break
    # if second iteration less than 60% accuracy average don't continue
    elif resamp == 2 and (accumAcc < (0.55*2) and runTime < 300) or (accumAcc < (0.60*2) and runTime > 300):
      print("Stopping resampling after 2 iterations")
      finished = False
      break
    # if third iteration less than 65% accuracy average don't continue
    elif resamp == 3 and (accumAcc < (0.60*3) and runTime < 300) or (accumAcc < (0.65*3) and runTime > 300):
      print("Stopping resampling after 3 iterations")
      finished = False
    # if by fourth iteration is less than 65% accuracy average don't continue
    elif resamp == 4 and accumAcc < (0.65 * 4):
      print("Stopping resampling after 4 iterations")
      finished = False
    else:
      # massive models cannot afford to run for longer than 50 epochs
      if params['denseSizeMax'] < 1500:
        perf = evaluateModel(model, 150, trainDS, testDS)
        finished = True
      elif params['denseSizeMax'] < 2000:
        perf = evaluateModel(model, 100, trainDS, testDS)
        finished = True
      else: 
        perf = evaluateModel(model, 50, trainDS, testDS)
        finished = True
    
    end_time = time.time()
    accumAcc = accumAcc + perf
  
  # record if it finished  
  params['finished'] = finished
  # compute the accuracy 
  if finished:
    params['meanAcc'] = accumAcc / folds
  else:
    params['meanAcc'] = 0
  
    
  runTime = end_time - start_time
  params['time'] = runTime
  results = results.append(params, ignore_index=True)
  print(results)
  
  print("-------------------- \n")
  print("The final tunning results are: ")
  print(results)
  results.to_csv('classificationModel/HPO.csv', index=False)
  
