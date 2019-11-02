import logging
from incapsula import crack, IncapSession
import requests
from bs4 import BeautifulSoup

# global vars
predictions = []

class Prediction:
	"""Class that holds all info for one predictable match"""
	def __init__(self, prev, t, time, home, away):
		self.hasPreview = prev
		if t == 0:
			self.day = "today"
		elif t == 1:
			self.day = "tomorrow"
		else:
			self.day = "ERROR"
		self.time = time
		self.hometeam = home
		self.awayteam = away
	prevurl = ""
	histurl = ""
	hometeam = ""
	awayteam = ""
	day = ""
	time = ""
	hasPreview = False

def updatePreviews(previewsOnly):
	"""Will update the global array that holds all preview instances (Predictions)"""
	session = requests.Session()
	session.headers.update({'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0'})
	# get full page
	r = crack(session, session.get('https://www.whoscored.com'))
	soup = BeautifulSoup(r.content, "html.parser")
	# get tomorrow's matches
	r2 = crack(session, session.get("https://www.whoscored.com/LiveScoresSummary?day=tomorrow"))
	soup2 = BeautifulSoup(r2.content, "html.parser")
	# find all preview a's
	tables = [soup.find("table", class_="detailed-tournaments"), soup2.find("table", class_="detailed-tournaments")]
	for t, table in enumerate(tables):
		for i, row in enumerate(table.select("tr.match")):
			# create new prediction instance
			predictions.append(Prediction(
			len(row.select("td.toolbar.right a.preview")) == 1,
			t,
			row.select("td.time")[0].contents[0].strip(),
			row.select("td.home a")[0].get_text().strip(),
			row.select("td.away a")[0].get_text().strip()
			))
	previewCounter = 0
	for p in predictions:
		if previewsOnly and not p.hasPreview:
			continue
		previewCounter += 1
		print "time: ", p.day + " " + p.time
		print "home: ", p.hometeam
		print "away: ", p.awayteam
		print "preview: ", "Yes" if p.hasPreview else "No"
	print(str(len(predictions)) + " matches in total, of which " + str(previewCounter) + " have a preview available.")
	

updatePreviews(True)
