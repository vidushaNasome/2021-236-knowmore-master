import os
from sklearn.metrics import mean_squared_error
from math import sqrt
from os.path import join
import cv2
import numpy as np
import shutil
from glob import glob
import pytesseract

from .models import VideoCluster
# Model for key frame extraction and redundancy frame removal

os.environ["PATH"] += os.pathsep + os.getcwd()


def create_dir(path):
    try:
        if not os.path.exists(path):
            os.makedirs(path)
    except OSError:
        print(f"ERROR: creating directory with name {path}")


def save_frame(video_path, save_dir, gap=1):
    name = video_path.split("/")[-1].split(".")[0]
    save_path = os.path.join(save_dir, name)
    create_dir(save_path)

    cap = cv2.VideoCapture(video_path)
    idx = 0

    while True:
        ret, frame = cap.read()

        if ret == False:
            cap.release()
            break

        if idx == 0:
            cv2.imwrite(f"{save_path}/{idx}.png", frame)
        else:
            if idx % gap == 0:
                cv2.imwrite(f"{save_path}/{idx}.png", frame)

        idx += 1


def getBwLittleImgs(datasetPath,videoname):
    # Find all classes paths in directory and iterate over it

    for (i, classPath) in enumerate(os.listdir(datasetPath)):

        # Construct detected directory with images from MobileNET SSD
        # imgDir = join(datasetPath, classPath, "detected")
        imgDir = join(datasetPath, classPath, videoname)
        # Construct directory to write 32x32 pix images
        bwDir = join(datasetPath, classPath, "bwdir")

        print(classPath)

        # Create bwDir patch or delete existing!
        if not os.path.exists(bwDir):
            os.makedirs(bwDir)
        else:
            shutil.rmtree(bwDir)
            os.makedirs(bwDir)

        # Iterate over all images in videoname directory
        for (j, imgName) in enumerate(os.listdir(imgDir)):

            # path to each image
            imgPath = join(imgDir, imgName)
            # Read image using OpenCV as grayscale
            image = cv2.imread(imgPath, cv2.IMREAD_GRAYSCALE)

            # Check if we opened an image.
            if image is not None:
                # Resize opened image
                resized_image = cv2.resize(image, (32, 32))
                resized_image = np.array(resized_image)
                # Save image to bwdir. Name should be the same as name in "videoname" directory
                cv2.imwrite(os.path.join(bwDir, imgName), resized_image)
            else:
                # remove a file that is not an image. I don't need it.
                print(imgPath)
                os.remove(imgPath)


def findDelDuplBw(searchedName, bwDir):
    # Join path to orginal image that we are looking duplicates
    searchedImg = join(bwDir, searchedName)

    imagelist = []

    # Start iterate over all bw images
    for (j, cmpImageName) in enumerate(os.listdir(bwDir)):

        if cmpImageName == searchedName:
            # If name in bwDir is equal to searched image - pass. I don't wan to delete searched image in bw dir
            pass
        else:
            # If name is different - concatenate path to image
            cmpImageBw = join(bwDir, cmpImageName)

            try:
                # Open image in bwDir - The searched image
                searchedImageBw = np.array(cv2.imread(searchedImg, cv2.IMREAD_GRAYSCALE))
                # Open image to be compared
                cmpImage = np.array(cv2.imread(cmpImageBw, cv2.IMREAD_GRAYSCALE))
                # Count root mean square between both images (RMS)
                rms = sqrt(mean_squared_error(searchedImageBw, cmpImage))
            except:
                continue

            # If RMS is smaller than 3 - this means that images are similar or the same
            if rms < 3:
                # Delete compared image in BW dir
                os.remove(cmpImageBw)
                print(searchedImg, cmpImageName, rms)


# def findDelDetected(detectedDir, bwDir):
def findDelDetected(testDir, bwDir, sessionfolder):
    # I have to compare bw dir and detected dir.
    # In bw dir I get rid of duplicates. Now I have to
    # get rid of duplicates in detected dir

    # List all bw files in bw dir

    l = []
    bwFiles = os.listdir(bwDir)

    # Iterate over detected dir
    for file in os.listdir(testDir):
        # Check if file in detected dir can be found in bw dir
        if file not in bwFiles:
            # Deletde if not. This means that that the duplicate or simillar image is found
            print(file, " to be deleted")
            os.remove(os.path.join(testDir, file))
        else:
            l.append(str(file))


    print(l)
    return l


def redundancy(sessionfolder,videoname,stuid):
    # Define working directory - direcotry with our dowloaded data images
    # datasetPath = os.getcwd() + "\media"+'\\'+sessionfolder+"\save"

    datasetPath = os.getcwd() + str('\\') + 'media\\' + sessionfolder + "\Save"+"\\"+ str(stuid)

    # +str('\\')+sessionfolder+str('\\test')

    # To clean data I wan to produce 32x32 pix images of data set.
    # And store them in "bwdir" in every class
    getBwLittleImgs(datasetPath,videoname)

    # Now lets iterate over all classes in data set
    for (i, classPath) in enumerate(os.listdir(datasetPath)):

        # Join detected by previous script path
        testDir = join(datasetPath, classPath, videoname)
        # Join black-white images path
        bwDir = join(datasetPath, classPath, "bwdir")

        # Iterate over images in one class - detected images previously by MobileSSD net
        for (i, detectedImg) in enumerate(os.listdir(testDir)):
            # Find duplicated BW images and delete duplicates.
            findDelDuplBw(detectedImg, bwDir)

        # Basing on cleaned BW images, now clean detected direcotry comparing data
        # between detected directory and bwDir directory
        y = findDelDetected(testDir, bwDir, sessionfolder)


        # Remove bwDir - we don't need it any more
        shutil.rmtree(bwDir)

        return y


def extractframesfromvideo(sessionfolder,videosname,stuid):
    # video_paths = glob("media/videos/*)

    x = "media/videos/" + sessionfolder + "/*"

    # str1 = ''.join(x)

    video_paths = glob(x)

    save_dir = "media/" + str(sessionfolder) + "/save/"+str(stuid)

    for path in video_paths:
        save_frame(path, save_dir, gap=500)
    

def reduncdancyRemover(sessionfolder,videoname,stuid):
   t = redundancy(sessionfolder,videoname,stuid)

   return t

