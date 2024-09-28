import xmlschema
import pprint
import sys
my_schema = xmlschema.XMLSchema('./schemat.xsd')

try:
    my_schema.validate("file.xml")
except Exception as e:
    print(e.path)
    sys.exit(1)

print("OK!")