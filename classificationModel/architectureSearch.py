# Author: Austin Stephen
# Date: 04/06/2023
# Purpose: Search for the best architecture of the neural network
import tensorflow as tf
import random
import pandas as pd
from train import evaluateModel
from readData import readData
import time
num_classes = 3


# create dense layers
def createModel():
  # search spaces 
  # learning rate
  learningRate = random.choice([0.000005, 0.00001, 0.00005, 0.0001, 0.0005])
  # number of dense layers
  denseLayers = random.choice([1, 2, 3, 4, 5, 6])
  # maximum size of the dense layers
  denseSizeMax = random.choice([100, 256, 100, 256, 256*2, 256*4, 256*8, 256*16])
  # Size of the last dense layer
  denseSizeLast = random.choice([30, 30, 50, 50, 100, 200, 300])
  # number of convolutions
  convolutions = random.choice([1]) #, 2, 3])

  # sizes of the convolutions
  convolutionSize = random.choice([60, 50, 40, 30, 20, 10])
  # ammount of random contrast to apply to the images
  randomContrast = random.choice([0.1, 0.05])
  randomRot = random.choice([0.15, 0.1, 0.05, 0.01, 0])
  
  params = {'learningRate': learningRate, 'denseLayers': denseLayers, 
            'denseSizeMax': denseSizeMax, 'denseSizeLast': denseSizeLast, 
            'convolutions': convolutions, 'convolutionSize' : convolutionSize, \
            'randomContrast': randomContrast, 'randomRot': randomRot}
      
  
  # inital base model
  model = tf.keras.Sequential([
    tf.keras.layers.Rescaling(1.0/255),
    tf.keras.layers.RandomContrast(factor = randomContrast),
    tf.keras.layers.RandomRotation(factor = randomRot)])
  
  # add the convolutions
  for i in range(convolutions):
    print("Adding CV")
    size = int(convolutionSize / (i+1))
    print("size, ", size)
    if(convolutionSize > 10):
      model.add(tf.keras.layers.Conv2D(size, 3, activation='relu'))
      model.add(tf.keras.layers.MaxPooling2D())

  # Add the dense layers
  for i in range(denseLayers):
    print("Adding Dense")
    size = int(denseSizeMax / (i+1))
    print("size, ", size)
    model.add(tf.keras.layers.Dense(size, activation='relu'))
  
  # add last dense layer if it is smaller than the last normal layer
  if denseSizeLast < int(denseSizeMax / (denseLayers + 1)):
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
                        'MeanAcc': []})

# number of folds to evaluate the configuration under
folds = 3
# numer of configurations to evaluate
configs = 100

for paramConfig in range(configs):
  
# same splits
  # create model
  model, params = createModel()
  accumAcc = 0

  # Evaluate model for each fold
  for resamp in range(folds):
    # record time for a fold
    start_time = time.time()
    
    # get new train test split
    trainDS, testDS= readData(32, resamp)
    # if small learning rate
    if params['learningRate'] < 0.00005:
      probability_model, perf = evaluateModel(model, 50, trainDS, testDS)
    else:
      probability_model, perf = evaluateModel(model, 25, trainDS, testDS)
    
    end_time = time.time()
    accumAcc = accumAcc + perf
    
  # add the the results
  params['MeanAcc'] = accumAcc / folds
  params['time'] = start_time - end_time
  results = results.append(params, ignore_index=True)
  print(results)
  
  print("-------------------- \n")
  print("The final tunning results are: ")
  print(results)
  results.to_csv('classificationModel/HPO.csv', index=False)
  
  
# save the final model
# probability_model.save("savedModels/model_V2.0")
