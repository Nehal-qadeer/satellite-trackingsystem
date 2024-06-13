from packages import *

def open_chrome_driver(url_part,i):
    name = ['CZ-3C R/B','OPS 9437 (DSCS 2-7)','DELTA 1 DEB']
    launch_year = ['2010','1977','1977']
    urls = ['https://www.satflare.com/track.asp?q=36288#TOP','https://www.satflare.com/track.asp?q=%201000#TOP','https://www.satflare.com/track.asp?q=10221#TOP']

    # urls = ['https://www.satflare.com/track.asp?q=10002#TOP','https://www.satflare.com/track.asp?q=10096#TOP','https://www.satflare.com/track.asp?q=00100#TOP']
    #Hammad
    # r = redis.Redis(
    # host='redis-11216.c57.us-east-1-4.ec2.redns.redis-cloud.com',
    # port=11216,
    # password='wYxWadiBK06HjAMcEKGxG34Euz1sROia')


    r = redis.Redis(
    host='redis-18031.c10.us-east-1-4.ec2.redns.redis-cloud.com',
    port=18031,
    password='ULpXSi6mbA8NKVzH2PLARURIeE7ts1tL')

    # Nehal Bhai
    # r = redis.Redis(
    # host='redis-14507.c293.eu-central-1-1.ec2.redns.redis-cloud.com',
    # port=14507,
    # password='JZzTXUToEs92B8wBHzTAFI0ZRPp24Mg0')
    myclient = pymongo.MongoClient("mongodb+srv://admin:admin@mernapp.50ko6vi.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=certifi.where())
    mydb = myclient["mydatabase"]
    current_date = datetime.now().date()
    mycol = mydb["settallite"]


    print(url_part,i)
    driver = webdriver.Chrome()
    wait = WebDriverWait(driver,30)
    driver.get(url_part[0])
    time.sleep(3)
    try:
        btn = wait.until(
                        EC.presence_of_element_located((By.XPATH, f"(//*[contains(text(), 'OK')])"))).click()
    except:
        pass
        
    time.sleep(15)
    btn1 = wait.until(
                        EC.presence_of_element_located((By.XPATH, f"(//*[contains(text(), 'OK, I Agree')])"))).click()
    time.sleep(15)
    for j in range(1000000):
        driver.maximize_window()
        # print(name[i])
        time.sleep(2)
        if j % 50 == 0:
            r.flushdb()
            print(j)
        # Your condition check code
        driver.execute_script("window.scrollTo(0, 1000);")
        time_utc = wait.until(
                            EC.presence_of_element_located((By.XPATH, f"(//td[@id='DisplayEventTime'])"))).text
        # print(time_utc)
        latitude = wait.until(
                            EC.presence_of_element_located((By.XPATH, f"(//td[@id='DisplayWorkingSatLatitude'])"))).text
        # print(latitude)
        longitude = wait.until(
                            EC.presence_of_element_located((By.XPATH, f"(//td[@id='DisplayWorkingSatLongitude'])"))).text
        # print(longitude)
        altitude = wait.until(
                            EC.presence_of_element_located((By.XPATH, f"(//td[@id='DisplayWorkingSatAltitude'])"))).text
        # print(altitude)
        elevation = wait.until(
                            EC.presence_of_element_located((By.XPATH, f"(//td[@id='DisplayWorkingSatElevation'])"))).text
        # print(elevation)
        # Create a dictionary to store the data
        satellite_data = {
            'name': name[i],
            'launch_year': launch_year[i] ,
            'time_utc': time_utc,
            'latitude': latitude,
            'longitude': longitude,
            'altitude': altitude,
            'elevation': elevation
        }
        # print(satellite_data)
        # Convert dictionary to JSON string
        data_json = json.dumps(satellite_data)
        time.sleep(1)
        # Save the data in Redis
        r.rpush('settlelite', data_json)
        data_json = json.dumps(satellite_data)
        data_dict = json.loads(data_json)  # Convert back to dictionary (if needed)
        # Insert the data
        result = mycol.insert_one(data_dict)
        # print(result)
        # try:

        #     data_json = json.dumps(satellite_data)
        # except Exception as e:
        #     print(e)
        # time.sleep(1)
        # # Save the data in Redis
        # r.rpush('settlelite', data_json)
        # result = mycol.insert_one(satellite_data)
        # print(result)
        # # print(satellite_data,urls[i])
        # # Convert dictionary to JSON string
        # data_json = json.dumps(satellite_data)
        # time.sleep(1)
        # # Save the data in Redis
        # r.rpush('settlelite', data_json)
def main():
    # urls = ['https://www.satflare.com/track.asp?q=00000#TOP','https://www.satflare.com/track.asp?q=00001#TOP','https://www.satflare.com/track.asp?q=00100#TOP']
    # urls = ['https://www.satflare.com/track.asp?q=10000#TOP','https://www.satflare.com/track.asp?q=10002#TOP','https://www.satflare.com/track.asp?q=00001#TOP']
    # urls = ['https://www.satflare.com/track.asp?q=00000#TOP','https://www.satflare.com/track.asp?q=00001#TOP']
    urls = ['https://www.satflare.com/track.asp?q=36288#TOP','https://www.satflare.com/track.asp?q=%201000#TOP','https://www.satflare.com/track.asp?q=10221#TOP']
    # Convert the result back to a list
    different_urls_list = list(urls)
    print(len(different_urls_list))

    urls_per_part = len(different_urls_list) // 3
    processes = []
    for i in range(3):
        start_index = i * urls_per_part
        end_index = (i + 1) * urls_per_part
        part = different_urls_list[start_index:end_index]

        process = Process(target=open_chrome_driver, args=(part,i))
        process.start()
        processes.append(process)

    for process in processes:
        process.join()

if __name__ == "__main__":
    main()