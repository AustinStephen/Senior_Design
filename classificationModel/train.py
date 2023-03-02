# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Process the images of mountain data for the classfier to be trained
#          and validated with.

import tensorflow as tf
from os import listdir
from modelAnalysis import printData, plotTraining, showImages
# import tensorflow_datasets as tfds

# Set the hyper parameters
batchSize = 32
imgHeight = 128
imgWidth = 250
num_classes = 3

# 260 by 128 to minimize distortion 

# read in the training data
trainDS = tf.keras.utils.image_dataset_from_directory(
  './classificationModel/imagesData',
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(imgHeight, imgWidth),
  batch_size=batchSize,
  color_mode='rgb')

# create validation data
valDS = tf.keras.utils.image_dataset_from_directory(
  './classificationModel/imagesData',
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(imgHeight, imgWidth),
  batch_size=batchSize,
  color_mode='rgb')

def random_invert_img(x, p=0.5):
  if  tf.random.uniform([]) < p:
    x = (255-x)
  else:
    x
  return x

# print the structure of the data 
printData(trainDS)
printData(valDS)

# showImages(trainDS)

# perfromance 
AUTOTUNE = tf.data.AUTOTUNE
trainDS = trainDS.cache().prefetch(buffer_size=AUTOTUNE)
valDS = valDS.cache().prefetch(buffer_size=AUTOTUNE)

# model with feature augemntation 
model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1.0/255),
  tf.keras.layers.RandomContrast(0.2, seed = 23),
  tf.keras.layers.RandomBrightness(0.01, seed = 23),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(64, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(32, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(num_classes)
])

model.compile(
  optimizer='adam',
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'])

# train model
history = model.fit(trainDS, validation_data=valDS, epochs=50)
#plot history
plotTraining(history)

# summarise model layers
model.summary()

# understand model training
print(history.history.keys())

# # Evaluate the model on the test data
# test_loss, test_acc = model.evaluate(valDS, valDS)
# print("Test accuracy:", test_acc)


# save
model.save("savedModels/model_V1.0")
