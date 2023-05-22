import config
import pycountry


def possible_combinations(value):
    string = value
    words = string.split()

    output = []
    for i in range(len(words)):
        for j in range(i, len(words)):
            output.append(' '.join(words[i:j + 1]))
    return output


def suppler_namelist(page_number, page_size):
    page = (page_number - 1) * page_size
    print(page)
    query = f'select distinct(c.Supplier_Name) from c OFFSET {page} limit {page_size}'
    item = config.execute_query(query)
    return item


def industry_data(page_number, page_size, search):
    search = possible_combinations(search)
    output = ''
    for element in search:
        output += f"concat(concat(concat(concat(c.Level_1,' '),c.Level_2),' '),c.Level_3) like '%{element}%' or "

    where = output[:-4]
    page = (page_number - 1) * page_size
    print(page)

    query = f'SELECT * FROM c ' \
            f"WHERE {where} " \
            f'OFFSET {page} limit {page_size}'
    item = config.execute_query(query)
    return item


def region_wise_data(page_number, page_size, region):
    try:
        if len(region).__eq__(2):
            country = region
            country_data = pycountry.countries.get(alpha_2=country)
            iso2 = country_data.alpha_2.lower()
            iso3 = country_data.alpha_3.lower()
            country_name = country_data.name.lower()
            page = (page_number - 1) * page_size
            print(page)
            query = f'select * from c ' \
                    f"where lower(c.Country_Region) in ('{iso2}','{iso3}','{country_name}') " \
                    f'OFFSET {page} LIMIT {page_size} '
            print(query)
            item = config.execute_query(query)
            return item
        elif len(region).__eq__(3):
            country = region
            country_data = pycountry.countries.get(alpha_3=country)
            iso2 = country_data.alpha_2.lower()
            iso3 = country_data.alpha_3.lower()
            country_name = country_data.name.lower()
            page = (page_number - 1) * page_size
            print(page)
            query = f'select * from c ' \
                    f"where lower(c.Country_Region) in ('{iso2}','{iso3}','{country_name}') " \
                    f'OFFSET {page} LIMIT {page_size} '
            print(query)
            item = config.execute_query(query)
            return item
        else:
            country = region
            country_data = pycountry.countries.get(name=country)
            iso2 = country_data.alpha_2.lower()
            iso3 = country_data.alpha_3.lower()
            country_name = country_data.name.lower()
            page = (page_number - 1) * page_size
            print(page)
            query = f'select * from c ' \
                    f"where lower(c.Country_Region) in ('{iso2}','{iso3}','{country_name}') " \
                    f'OFFSET {page} LIMIT {page_size} '
            print(query)
            item = config.execute_query(query)
            return item
    except:
        return f"please insert valid region name: '{region}'"


def fetch_supplier_data(para1, page_number, page_size, operator, column_name, comp_ope, column_value):
    page = (page_number - 1) * page_size
    operators = ['AND','OR']
    value_1 = para1.lower()
    value = column_value.lower()
    if operator.upper() in operators:
        if comp_ope.lower().__eq__('like'):
            query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                    f"{operator} lower(c.{column_name}) {comp_ope} '%{value}%'" \
                    f' OFFSET {page} LIMIT {page_size} '
            print(query)
            item = config.execute_query(query)
            return item
        elif comp_ope.lower().__eq__('in'):

            list_1 = value.replace(', ', ',').replace(' ,', ',').split(',')
            list_2 = []
            for i in list_1:
                list_2.append("'" + i + "'")

            values = ",".join(list_2)

            query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                    f"{operator} lower(c.{column_name}) {comp_ope} ({values})" \
                    f' OFFSET {page} LIMIT {page_size}'
            print(query)
            item = config.execute_query(query)
            return item
        else:
            if column_value.isnumeric():
                query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                        f" {operator} lower(c.{column_name}) {comp_ope} {value}" \
                        f' OFFSET {page} LIMIT {page_size}'
                print(query)
                item = config.execute_query(query)
                return item
            elif type(column_value) == str and column_value == '':
                query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                        f" {operator} lower(c.{column_name}) {comp_ope} {value}" \
                        f' OFFSET {page} LIMIT {page_size} '
                print(query)
                item = config.execute_query(query)
                return item
            else:
                query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                        f" {operator} lower(c.{column_name}) {comp_ope} '{value}'" \
                        f' OFFSET {page} LIMIT {page_size}'
                print(query)
                item = config.execute_query(query)
                return item
    else:
        query = f"SELECT * FROM c WHERE lower(c.Supplier_Name) like '%{value_1}%'" \
                f' OFFSET {page} LIMIT {page_size}'
        print(query)
        item = config.execute_query(query)
        return item
