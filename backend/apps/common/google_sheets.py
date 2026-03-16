import gspread
from google.oauth2.service_account import Credentials
import os
import json

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

# Load credentials from Render environment variable
google_creds = os.getenv("GOOGLE_CREDENTIALS")

creds = Credentials.from_service_account_info(
    json.loads(google_creds),
    scopes=SCOPES
)

client = gspread.authorize(creds)

SHEET_ID = "1dd387Yy7BRr1LuCPEJis227qnBMRCrsttPQseXEmg54"
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


def setup_sheet_design():

    if not sheet.row_values(1):
        sheet.append_row(HEADERS)

    # HEADER STYLE
    sheet.format("A1:L1", {
        "backgroundColor": {"red": 0.10, "green": 0.10, "blue": 0.10},
        "horizontalAlignment": "CENTER",
        "verticalAlignment": "MIDDLE",
        "textFormat": {
            "foregroundColor": {"red": 1, "green": 1, "blue": 1},
            "bold": True,
            "fontSize": 11
        }
    })

    sheet.freeze(rows=1)

    # FIX COLUMN WIDTH
    sheet.spreadsheet.batch_update({
        "requests": [
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 0, "endIndex": 1},
                "properties": {"pixelSize": 120},
                "fields": "pixelSize"
            }},
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 1, "endIndex": 2},
                "properties": {"pixelSize": 180},
                "fields": "pixelSize"
            }},
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 2, "endIndex": 4},
                "properties": {"pixelSize": 150},
                "fields": "pixelSize"
            }},
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 4, "endIndex": 6},
                "properties": {"pixelSize": 160},
                "fields": "pixelSize"
            }},
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 6, "endIndex": 9},
                "properties": {"pixelSize": 140},
                "fields": "pixelSize"
            }},
            {"updateDimensionProperties": {
                "range": {"sheetId": 0, "dimension": "COLUMNS", "startIndex": 9, "endIndex": 12},
                "properties": {"pixelSize": 140},
                "fields": "pixelSize"
            }}
        ]
    })

    # LIMIT SHEET TO 12 COLUMNS
    sheet.spreadsheet.batch_update({
        "requests": [{
            "updateSheetProperties": {
                "properties": {
                    "sheetId": 0,
                    "gridProperties": {"columnCount": 12}
                },
                "fields": "gridProperties.columnCount"
            }
        }]
    })

    # LIGHT ROW BACKGROUND
    row_count = len(sheet.get_all_values())

    if row_count > 1:
        sheet.format(f"A2:K{row_count}", {
            "backgroundColor": {
                "red": 0.94,
                "green": 0.94,
                "blue": 0.94
            }
        })

    # REMOVE OLD RULES
    try:
        sheet.spreadsheet.batch_update({
            "requests": [
                {"deleteConditionalFormatRule": {"sheetId": 0, "index": 0}},
                {"deleteConditionalFormatRule": {"sheetId": 0, "index": 0}},
                {"deleteConditionalFormatRule": {"sheetId": 0, "index": 0}}
            ]
        })
    except:
        pass

    # STATUS COLORS
    sheet.spreadsheet.batch_update({
        "requests": [

            # CONFIRMED
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
                                "values": [{"userEnteredValue": "Confirmed"}]
                            },
                            "format": {
                                "backgroundColor": {"red": 0.8, "green": 1, "blue": 0.8},
                                "textFormat": {"bold": True}
                            }
                        }
                    },
                    "index": 0
                }
            },

            # RETURNED
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
                                "values": [{"userEnteredValue": "Returned"}]
                            },
                            "format": {
                                "backgroundColor": {"red": 0.8, "green": 0.9, "blue": 1},
                                "textFormat": {"bold": True}
                            }
                        }
                    },
                    "index": 1
                }
            },

            # CANCELLED
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
                                "values": [{"userEnteredValue": "Cancelled"}]
                            },
                            "format": {
                                "backgroundColor": {"red": 1, "green": 0.85, "blue": 0.85},
                                "textFormat": {"bold": True}
                            }
                        }
                    },
                    "index": 2
                }
            }

        ]
    })

    # COLUMN ALIGNMENT
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
        booking.status
    ])

    last_row = len(sheet.get_all_values())

    sheet.format(f"A{last_row}:K{last_row}", {
        "backgroundColor": {"red": 0.94, "green": 0.94, "blue": 0.94}
    })


def update_return_status(booking):

    records = sheet.get_all_values()

    for i, row in enumerate(records):

        if str(row[0]).strip() == str(booking.id):

            sheet.update_cell(i + 1, 12, booking.status)

            break