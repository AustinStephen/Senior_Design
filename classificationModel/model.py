# Author: Austin Stephen
# Purpose: Train the best HPO configuration of the model on all of the data and save it.
# Date: 04/11/2023
import tensorflow as tf
from numpy.random import seed
from modelAnalysis import showImages, confusionMatrix
from readData import readData
import numpy

seed(1)

# params
batchSize = 16
randomContrast = 0.20
dropoutRate = 0.50
convolutionSize = 6
denseSizeMax = 550
denseSizeLast = 30
numDenseLayers = 5
learningRate = 0.0001
# learningRate = 0.00005
numClass = 6


imgHeight = 128
# larger to minimize distortion
imgWidth = 250
  
# All of the data
allData = tf.keras.utils.image_dataset_from_directory(
    './classificationModel/imagesData',
    # validation_split=0.5,
    # subset="training",
    label_mode = "categorical",
    seed = 33,
    image_size=(imgHeight, imgWidth),
    batch_size=batchSize,
    color_mode='rgb')

# perfromance optimizations 
AUTOTUNE = tf.data.AUTOTUNE
allData = allData.cache().prefetch(buffer_size=AUTOTUNE)

# model architecture
model = tf.keras.Sequential([
  tf.keras.layers.Rescaling(1.0/255),
  tf.keras.layers.RandomContrast(factor = randomContrast),
  tf.keras.layers.Conv2D(5, 6, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Conv2D(3, 12, activation='relu'),
  tf.keras.layers.MaxPooling2D(),
  # tf.keras.layers.Conv2D(3, 12, activation='relu'),
  # tf.keras.layers.MaxPooling2D(),
  tf.keras.layers.Dense(40, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Flatten(),
  # tf.keras.layers.Dense(500, activation='relu'),
  # tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  # tf.keras.layers.Dense(250, activation='relu'),
  # tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Dense(65, activation='relu'),
  tf.keras.layers.Dropout(dropoutRate, input_shape=(2,)),
  tf.keras.layers.Dense(numClass, activation='relu')
  ])

# Compile the model
model.compile(
  optimizer=tf.keras.optimizers.Adam(learning_rate = learningRate),
  loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True, label_smoothing=0.35),
  metrics=['accuracy'])

model.fit(allData, epochs=50, shuffle=True)


# convert to probability model
probability_model = tf.keras.Sequential([model, 
                                        tf.keras.layers.Softmax()])
probability_model.build(input_shape = (None, 128, 250, 3))

# save the final model
probability_model.save("savedModels/model_V4.3/model.h5")