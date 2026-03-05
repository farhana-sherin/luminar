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


def add_booking(booking):
    sheet.append_row([
        booking.id,
        booking.customer_name,
        booking.mobile,
        booking.place,
        booking.dress.name,
        str(booking.start_date),
        str(booking.end_date),
        booking.total_days,
        float(booking.total_price)
    ])