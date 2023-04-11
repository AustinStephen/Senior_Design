# Author: Austin Stephen
# Purpose: Train the best HPO configuration of the model on all of the data and save it.
# Date: 04/11/2023
import tensorflow as tf
import numpy as np

# params
batchSize = 64
randomContrast = 0.2
randomRot = 0.0
dropoutRate = 0.5
convolutionSize = 40
denseSizeMax = 100
denseSizeLast = 100
numDenseLayers = 5
learningRate = 0.0001
numClass = 6

# Acc on the 5 fold analysis 90%
imgHeight = 128
# larger to minimize distortion
imgWidth = 250
  
# data
DS = tf.keras.utils.image_dataset_from_directory(
    './classificationModel/imagesData',
    image_size=(imgHeight, imgWidth),
    batch_size=batchSize,
    color_mode='rgb')

# perfromance 
AUTOTUNE = tf.data.AUTOTUNE
DS = DS.cache().prefetch(buffer_size=AUTOTUNE)

# model architecture
model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1.0/255),
  tf.keras.layers.RandomContrast(factor = randomContrast),
  tf.keras.layers.RandomRotation(factor = randomRot),
  tf.keras.layers.Conv2D(convolutionSize, 3, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Dense(denseSizeMax, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Dense(denseSizeLast, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(numClass, activation='relu')
  ])

model.compile(
  optimizer=tf.keras.optimizers.Adam(learning_rate = learningRate),
  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
  metrics=['accuracy'])

model.fit(DS, epochs=20)

# convert to probability model
probability_model = tf.keras.Sequential([model, 
                                        tf.keras.layers.Softmax()])
probability_model.build(input_shape = (None, 128, 250, 3))

# save the final model
# probability_model.save("savedModels/model_V3.0")