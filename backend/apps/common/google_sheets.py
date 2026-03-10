import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

creds = Credentials.from_service_account_file(
    "credentials.json", scopes=SCOPES
)

client = gspread.authorize(creds)
sheet = client.open("DressBookingsTest").sheet1


def setup_sheet_design():

    headers = [
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
        "Returned"
    ]

    # Add headers if sheet empty
    if not sheet.row_values(1):
        sheet.append_row(headers)

    # Reset header formatting first (important)
    sheet.format("A1:L1", {
        "textFormat": {
            "foregroundColor": {
                "red": 1,
                "green": 1,
                "blue": 1
            }
        },
        "backgroundColor": {"red": 1, "green": 1, "blue": 1}
    })

    # Header style
    sheet.format("A1:L1", {
        "backgroundColor": {
            "red": 0.10,
            "green": 0.10,
            "blue": 0.10
        },
        "horizontalAlignment": "CENTER",
        "verticalAlignment": "MIDDLE",
        "textFormat": {
            "foregroundColor": {
                "red": 1,
                "green": 1,
                "blue": 1
            },
            "bold": True,
            "fontSize": 11
        }
    })

    sheet.freeze(rows=1)

    # Remove extra columns
    sheet_info = sheet.spreadsheet.fetch_sheet_metadata()
    column_count = sheet_info["sheets"][0]["properties"]["gridProperties"]["columnCount"]

    if column_count > 12:
        sheet.spreadsheet.batch_update({
            "requests": [{
                "deleteDimension": {
                    "range": {
                        "sheetId": 0,
                        "dimension": "COLUMNS",
                        "startIndex": 12,
                        "endIndex": column_count
                    }
                }
            }]
        })

    # Light background for rows with data
    row_count = len(sheet.get_all_values())

    if row_count > 1:
        sheet.format(f"A2:K{row_count}", {
            "backgroundColor": {
                "red": 0.94,
                "green": 0.94,
                "blue": 0.94
            }
        })

    # Remove previous conditional rules
    try:
        sheet.spreadsheet.batch_update({
            "requests": [
                {"deleteConditionalFormatRule": {"sheetId": 0, "index": 0}},
                {"deleteConditionalFormatRule": {"sheetId": 0, "index": 0}}
            ]
        })
    except:
        pass

    # Conditional formatting
    sheet.spreadsheet.batch_update({
        "requests": [

            # TRUE → green
            {
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{
                            "sheetId": 0,
                            "startRowIndex": 1,
                            "startColumnIndex": 11,
                            "endColumnIndex": 12
                        }],
                        "booleanRule": {
                            "condition": {
                                "type": "TEXT_EQ",
                                "values": [{"userEnteredValue": "TRUE"}]
                            },
                            "format": {
                                "backgroundColor": {
                                    "red": 0.80,
                                    "green": 1.00,
                                    "blue": 0.80
                                },
                                "textFormat": {
                                    "bold": True,
                                    "foregroundColor": {
                                        "red": 0,
                                        "green": 0.5,
                                        "blue": 0
                                    }
                                }
                            }
                        }
                    },
                    "index": 0
                }
            },

            # FALSE → red
            {
                "addConditionalFormatRule": {
                    "rule": {
                        "ranges": [{
                            "sheetId": 0,
                            "startRowIndex": 1,
                            "startColumnIndex": 11,
                            "endColumnIndex": 12
                        }],
                        "booleanRule": {
                            "condition": {
                                "type": "TEXT_EQ",
                                "values": [{"userEnteredValue": "FALSE"}]
                            },
                            "format": {
                                "backgroundColor": {
                                    "red": 1.00,
                                    "green": 0.90,
                                    "blue": 0.90
                                },
                                "textFormat": {
                                    "bold": True,
                                    "foregroundColor": {
                                        "red": 0.7,
                                        "green": 0,
                                        "blue": 0
                                    }
                                }
                            }
                        }
                    },
                    "index": 1
                }
            }
        ]
    })

    # Align columns
    sheet.format("A2:A1000", {"horizontalAlignment": "CENTER"})
    sheet.format("C2:C1000", {"horizontalAlignment": "CENTER"})
    sheet.format("G2:I1000", {"horizontalAlignment": "CENTER"})
    sheet.format("J2:J1000", {"horizontalAlignment": "CENTER"})
    sheet.format("K2:K1000", {"horizontalAlignment": "RIGHT"})
    sheet.format("L2:L1000", {
        "horizontalAlignment": "CENTER",
        "textFormat": {"bold": True}
    })


def add_booking(booking):

    if not sheet.row_values(1):
        setup_sheet_design()

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
        booking.returned
    ])

    last_row = len(sheet.get_all_values())

    sheet.format(f"A{last_row}:K{last_row}", {
        "backgroundColor": {
            "red": 0.94,
            "green": 0.94,
            "blue": 0.94
        }
    })


def update_return_status(booking):

    records = sheet.get_all_values()

    for i, row in enumerate(records):
        if str(row[0]).strip() == str(booking.id):
            sheet.update_cell(i + 1, 12, "TRUE")
            break