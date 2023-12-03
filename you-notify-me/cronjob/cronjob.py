import mysql.connector
import requests
from configparser import ConfigParser
from twilio.rest import Client

# Read configuration from the config file
config = ConfigParser()
config.read("config.ini")

# MySQL database connection configuration
db_config = {
    "host": config.get("Database", "host"),
    "user": config.get("Database", "user"),
    "password": config.get("Database", "password"),
    "database": config.get("Database", "database"),
}

# OpenWeatherMap API key
OPENWEATHERMAP_API_KEY = config.get("OpenWeatherMap", "api_key")

# Twilio configuration
twilio_account_sid = config.get("Twilio", "account_sid")
twilio_auth_token = config.get("Twilio", "auth_token")
twilio_messaging_service_sid = config.get("Twilio", "messaging_service_sid")

# Query to select distinct zipcodes from the Participants table
query = "SELECT DISTINCT phone_number, name, zipcode FROM WeatherSubscribers"

# Twilio setup
client = Client(twilio_account_sid, twilio_auth_token)

# Function to check if it will rain for a given zipcode today
def will_rain(zipcode):
    base_url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "zip": str(zipcode),
        "appid": OPENWEATHERMAP_API_KEY,
        "units": "metric"
    }

    response = requests.get(base_url, params=params)
    weather_data = response.json()

    if response.status_code == 200:
        # Check if there is any rain in the forecast for today
        for entry in weather_data.get("list", []):
            if "rain" in entry.get("weather", {}):
                return True

        return False
    else:
        print(f"Failed to fetch weather data for zipcode {zipcode}")
        return None

def send_text_messages(records):
    for record in records:
        message_body = f"Hi {record[1]}. Rain expected today in your zipcode {zipcode}. Please prepare accordingly."
        to_phone_number = record[0]
        print(to_phone_number)

        # Send SMS using Twilio
        message = client.messages.create(
            body=message_body,
            messaging_service_sid=twilio_messaging_service_sid,
            to=to_phone_number
        )

        print(f"SMS sent: {message.sid}")


def fetch_records():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    conn.close()
    return records

records_with_rain = []
records_without_rain = []
records = fetch_records()

for record in records:
    zipcode = record[2]  # Extract the zipcode from the row

    # Check if it will rain for the current zipcode
    if will_rain(zipcode):
        records_with_rain.append(record)
    else:
        records_without_rain.append(record)

send_text_messages(records_without_rain)