import uvicorn
from fastapi import FastAPI
import udfs

app = FastAPI()


@app.get("/supplier_name")
async def suppler_name(page_number: int = 1, page_size: int = 10):
    data = udfs.suppler_namelist(page_number, page_size)
    return data


@app.get("/industry_wise_data")
async def industry_wise_data(page_number: int = 1, page_size: int = 10, search_industry: str = ''):
    data = udfs.industry_data(page_number, page_size, search_industry)
    return data


@app.get("/region_wise_data")
async def region_data(page_number: int = 1, page_size: int = 10, region: str = ''):
    data = udfs.region_wise_data(page_number, page_size, region)
    return data


@app.get("/dynamic_data")
async def dynamic_data(page_number: int = 1, page_size: int = 10, supplier_name: str = '', logical_operator: str = ''
                       , column_name: str = '', comparison_operator: str = '', column_value: str = ''):
    data = udfs.fetch_supplier_data(supplier_name, page_number, page_size, logical_operator, column_name,
                                    comparison_operator, column_value)
    return data


if __name__ == '__main__':
    uvicorn.run(app, port=8000)
