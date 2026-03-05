import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=SCOPES
)

client = gspread.authorize(creds)

sheet = client.open("DressBookingsTest").sheet1


def add_booking(data):
    sheet.append_row([
        data["booking_id"],
        data["user"],
        data["dress"],
        data["date"],
        data["status"]
    ])