from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import chromedriver_autoinstaller as chromedriver
import time
import csv
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from multiprocessing import Process
from urllib.parse import urlparse, parse_qs
from datetime import datetime
import pymongo
import certifi
import ssl
import redis
import json