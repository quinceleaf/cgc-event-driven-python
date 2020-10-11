import pandas as pd


def transform_data(data_nyt, data_jhu):
    step = 0

    try:
        # normalize NYT data: (1) step
        # > convert date columns to datetime obj
        data_nyt["date"] = pd.to_datetime(data_nyt["date"])
        step = 1

        # normalize JHU data: (3) steps
        # > convert date columns to datetime obj
        data_jhu["date"] = pd.to_datetime(data_jhu["Date"])
        step = 2

        # > filter JHU for U.S. only
        data_jhu.rename(columns={"Country/Region": "Country"}, inplace=True)
        data_jhu = data_jhu.query('Country == "US"')
        step = 3

        # > drop extraneous columns from JHU
        data_jhu.drop(
            columns=[
                "Date",
                "Country",
                "Province/State",
                "Lat",
                "Long",
                "Confirmed",
                "Deaths",
            ],
            inplace=True,
        )
        step = 4

        # merge dfs
        data_combined = data_nyt.set_index("date").join(data_jhu.set_index("date"))
        step = 5

        # standardize column name format
        data_combined.rename(
            columns={"cases": "Cases", "deaths": "Deaths"}, inplace=True
        )
        step = 6

        # discard any row(s) with missing values
        data_combined.dropna(inplace=True)
        step = 7

        # > drop superfluous decimal
        data_combined = data_combined.astype(int)
        step = 8

        return True, data_combined, []

    except:
        return False, None, [f"Error in transformation: step {step}"]
