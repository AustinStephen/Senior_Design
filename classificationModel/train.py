# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Process the images of mountain data for the classfier to be trained
#          and validated with.

import tensorflow as tf
import numpy as np

def evaluateModel(model, epochs, trainDS, testDS):
  
  # perfromance 
  AUTOTUNE = tf.data.AUTOTUNE
  trainDS = trainDS.cache().prefetch(buffer_size=AUTOTUNE)
  testDS = testDS.cache().prefetch(buffer_size=AUTOTUNE)

  # train model -use some of the training data as test data
  history = model.fit(trainDS, validation_data=testDS, epochs=epochs)
  # evaluate on completely unseen data
  loss, finalAcc  = model.evaluate(testDS, batch_size=32)

  print(f"Accuracy on the unseen dataset: {finalAcc:.2f}")

  print("Final accuracy:", finalAcc)

  model.summary()

  # convert to probability model
  probability_model = tf.keras.Sequential([model, 
                                          tf.keras.layers.Softmax()])
  probability_model.build(input_shape = (None, 128, 250, 3))

  return probability_model, finalAcc

