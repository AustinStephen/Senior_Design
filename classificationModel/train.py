# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Process the images of mountain data for the classfier to be trained
#          and validated with.

import numpy as np
import tensorflow as tf
from tensorflow import keras
from os import listdir
import numpy as np
import matplotlib.pyplot as plt

# Set the hyper parameters
batchSize = 64
imgHeight = 128
imgWidth = 128
num_classes = 2

# read in the training data
trainDS = tf.keras.utils.image_dataset_from_directory(
  './classificationModel/imagesData',
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(imgHeight, imgWidth),
  batch_size=batchSize)

# create validation data
valDS = tf.keras.utils.image_dataset_from_directory(
  './classificationModel/imagesData',
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(imgHeight, imgWidth),
  batch_size=batchSize)

# Check you got the correct classes
class_names = trainDS.class_names
print(class_names)

# check train data dimensions 
for image_batch, labels_batch in trainDS:
  print(image_batch.shape)
  print(labels_batch.shape)

# check test data dimensions
for image_batch, labels_batch in valDS:
  print(image_batch.shape)
  print(labels_batch.shape)

model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1./255),
  tf.keras.layers.Conv2D(64, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(32, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(32, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(264, activation='relu'),
  tf.keras.layers.Dense(num_classes)
])

model.compile(
  optimizer='adam',
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'])

history = model.fit(
  trainDS,
  validation_data=valDS,
  epochs=50
)

# understand model training
print(history.history.keys())

# summarize history for accuracy
# plt.plot(history.history['accuracy'])
# plt.plot(history.history['val_accuracy'])
# plt.title('model accuracy')
# plt.ylabel('accuracy')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc='upper left')
# plt.show()

# summarize history for loss
# plt.plot(history.history['loss'])
# plt.plot(history.history['val_loss'])
# plt.title('model loss')
# plt.ylabel('loss')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc='upper left')
# plt.show()

# # Evaluate the model on the test data
# test_loss, test_acc = model.evaluate(x_test, y_test)
# print("Test accuracy:", test_acc)