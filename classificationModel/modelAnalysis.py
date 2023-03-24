# Author: Austin Stephen
# Date: 01/24/2023
# Purpose: Augment the mountain images data

import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix
  
def plotTraining(history):
  """Plots the training epocs with loss and accuracy over time.

  Args:
      history (tf array): The data read in from a directory 
  """
  # summarize history for accuracy
  plt.plot(history.history['accuracy'])
  plt.plot(history.history['val_accuracy'])
  plt.title('model accuracy')
  plt.ylabel('accuracy')
  plt.xlabel('epoch')
  plt.legend(['train', 'test'], loc='upper left')
  plt.show()

  # summarize history for loss
  plt.plot(history.history['loss'])
  plt.plot(history.history['val_loss'])
  plt.title('model loss')
  plt.ylabel('loss')
  plt.xlabel('epoch')
  plt.legend(['train', 'test'], loc='upper left')
  plt.show()
  
def printData(DS):
    # Check you got the correct classes
  print("class name: ", DS.class_names)

  # check train data dimensions 
  for image_batch, labels_batch in DS:
    print("image batch shape: ", image_batch.shape)
    print("label batch shape: ", labels_batch.shape)

def showImages(DS):
  class_names = DS.class_names

  plt.figure(figsize=(10, 10))
  for images, labels in DS.take(1):
      for i in range(16):
          ax = plt.subplot(4, 4, i + 1)
          plt.imshow(images[i].numpy().astype("uint8"))
          plt.title(class_names[labels[i]])
          plt.axis("off")
  plt.show()
  
def confusionMatrix(model, DS):
  # get the true labels and predicted labels for the validation dataset
  val_labels = []
  val_pred_labels = []

  for x, y in DS:
      val_labels.extend(y)
      val_pred = model.predict(x)
      val_pred_labels.extend(np.argmax(val_pred, axis=1))

  # convert the lists to numpy arrays
  val_labels = np.array(val_labels)
  val_pred_labels = np.array(val_pred_labels)

  # compute the confusion matrix
  cm = confusion_matrix(val_labels, val_pred_labels)
  print(cm)