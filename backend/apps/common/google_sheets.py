import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

# Load credentials
creds = Credentials.from_service_account_file(
    "credentials.json",
    scopes=SCOPES
)

client = gspread.authorize(creds)

# Your Google Sheet ID
SHEET_ID = "1VeX2j9j79fwXXexpSuLCK-46Su9Kyq8Xvj7D4UZrHeY"

sheet = client.open_by_key(SHEET_ID).sheet1


HEADERS = [
    "Booking ID",
    "Customer Name",
    "Mobile Number",
    "Place",
    "Dress Code",
    "Dress",
    "Booked Date",
    "Start Date",
    "End Date",
    "Total Days",
    "Total Amount",
    "Status"
]


def ensure_headers():
    """Create headers if sheet is empty"""
    if not sheet.row_values(1):
        sheet.append_row(HEADERS)


def add_booking(booking):
    """Add new booking to sheet"""

    ensure_headers()

    sheet.append_row([
        booking.id,
        booking.customer_name,
        booking.mobile_number,
        booking.place,
        booking.dress.code,
        booking.dress.name,
        booking.created_at.strftime("%d-%m-%Y"),
        booking.start_date.strftime("%d-%m-%Y"),
        booking.end_date.strftime("%d-%m-%Y"),
        booking.total_days,
        float(booking.total_amount),
        booking.status
    ])


def update_return_status(booking):
    """Update booking status in sheet"""

    records = sheet.get_all_values()

    for i, row in enumerate(records):
        if str(row[0]) == str(booking.id):
            sheet.update_cell(i + 1, 12, booking.status)
            break