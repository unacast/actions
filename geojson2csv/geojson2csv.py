#!/usr/bin/env python
import argparse
import csv
import json
import sys
import geojson
from shapely.geometry import shape

def parse_geojson(infile, outfile, geometry_column_name):
    with open(infile, 'r') as geojsonfile:
        input_geojson = geojson.load(geojsonfile)

    records = []
    for elm in input_geojson.features:
        geom = shape(elm['geometry']).wkt
        geom = {geometry_column_name: geom}
        prop = elm['properties']
        prop.update(geom)
        records.append(prop)

    with open(outfile, 'w') as csvfile:
        fieldnames = records[0].keys()
        writer = csv.DictWriter(csvfile, fieldnames)

        writer.writeheader()
        writer.writerows(records)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert geojson to csv with WKT geometries.')
    parser.add_argument('infile', help="Input geojson file name")
    parser.add_argument('outfile', help="Output csv file name")
    parser.add_argument('--colname', default='geometry', help="Geometry column name")
    args = parser.parse_args()

    parse_geojson(args.infile, args.outfile, args.colname)