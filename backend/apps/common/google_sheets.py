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

    headers = [
        "Booking ID",
        "Customer Name",
        "Mobile Number",
        "Place",
        "Dress Code",
        "Dress",
         "Created At",
        "Start Date",
        "End Date",
        "Total Days",
        "Total Amount",
        "Returned"
    ]

    # check first row
    if not sheet.row_values(1):
        sheet.append_row(headers)

    
    sheet.format("A1:L1", {
    "textFormat": {"bold": True}
})
    sheet.append_row([
        booking.id,
        booking.customer_name,
        booking.mobile_number,
        booking.place,
        booking.dress.code,
        booking.dress.name,
        booking.created_at.strftime("%Y-%m-%d %H:%M"),
        str(booking.start_date),
        str(booking.end_date),
        booking.total_days,
        float(booking.total_amount),
        booking.returned
    ])


def update_return_status(booking):

    records = sheet.get_all_values()

    for i, row in enumerate(records):
        if str(row[0]).strip() == str(booking.id):

            # Column 12 = Returned
            sheet.update_cell(i + 1, 12, "TRUE")
            break