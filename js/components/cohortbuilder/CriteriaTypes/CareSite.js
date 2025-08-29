define(['knockout', './Criteria', '../InputTypes/Range','conceptpicker/InputTypes/Concept', '../InputTypes/Text'], function (ko, Criteria, Range, Concept, Text) {

	function CareSite(data, conceptSets) {
		var self = this;
		data = data || {};

		Criteria.call(this, data, conceptSets);

		conceptSets.subscribe(function (changes) {
			changes.forEach(function(change) {
				if (change.status === 'deleted') {
					if (ko.utils.unwrapObservable(self.CodesetId) == change.value.id)
						self.CodesetId(null);
				}
			});
		}, null, "arrayChange");

		// General CareSIte Criteria

		self.CodesetId = ko.observable(data.CodesetId);

		self.StartDate = ko.observable(data.OccurrenceStartDate && new Range(data.StartDate));
		self.EndDate = ko.observable(data.OccurrenceEndDate && new Range(data.EndDate));
	}

	CareSite.prototype = new Criteria();
	CareSite.prototype.constructor = CareSite;
	CareSite.prototype.toJSON = function () {
		return this;
	}

	return CareSite;

});