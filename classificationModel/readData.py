# Author: Austin Stephen 
# Date: 04/06/2023
# Purpose: Read in the data.
import tensorflow as tf
import numpy as np

def readData(batchSize, seed):
  
  # larger to minimize distortion
  imgHeight = 128
  imgWidth = 250
  # read in the training data
  trainDS = tf.keras.utils.image_dataset_from_directory(
    './classificationModel/imagesData',
    validation_split=0.1,
    subset="training",
    seed=seed,
    image_size=(imgHeight, imgWidth),
    batch_size=batchSize,
    color_mode='rgb')

  # create validation data
  testDS = tf.keras.utils.image_dataset_from_directory(
    './classificationModel/imagesData',
    validation_split=0.1,
    subset="validation",
    seed=seed,
    image_size=(imgHeight, imgWidth),
    batch_size=batchSize,
    color_mode='rgb')
  
  # val_batches = tf.data.experimental.cardinality(valDS)
  # testDS = valDS.take((2*val_batches) // 3)
  # valDS = valDS.skip((2*val_batches) // 3)
  
  return trainDS, testDS
