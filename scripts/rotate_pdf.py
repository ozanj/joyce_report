import PyPDF2


# run `python ./scripts/rotate_pdf.py` from `joyce_report` directory
landscape_pages = [18, 19, 22, 23, 28, 29, 32, 33, 35, 36, 40, 41]  # pg # + 1

with open('./joyce_report.pdf', 'rb') as pdf_in:
  pdf_reader = PyPDF2.PdfFileReader(pdf_in)
  pdf_writer = PyPDF2.PdfFileWriter()
  
  for pagenum in range(pdf_reader.numPages):
    page = pdf_reader.getPage(pagenum)
    if pagenum in landscape_pages:
      page.rotateClockwise(90)
    pdf_writer.addPage(page)
    
  with open('./joyce_report_rotated.pdf', 'wb') as pdf_out:
    pdf_writer.write(pdf_out)
