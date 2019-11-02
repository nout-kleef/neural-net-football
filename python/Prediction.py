class Prediction:
	"""Class that holds all info for one predictable match"""
	def __init__(self, preview_url, history_url):
		self.purl = preview_url
		self.hurl = history_url
