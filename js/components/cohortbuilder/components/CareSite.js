define([
  "knockout",
  "../options",
  "../utils",
  "../InputTypes/Range",
  "../CriteriaGroup",
  "text!./CareSiteTemplate.html",
], function (ko, options, utils, Range, CriteriaGroup, template) {
  function CareSiteViewModel(params) {
    var self = this;
    self.expression = ko.utils.unwrapObservable(params.expression);
    self.Criteria = params.criteria.CareSite;
    self.options = options;

    self.addActions = [
      {
        text: ko.i18n('components.careSite.criteria.startDate.option.text', 'Add Start Date Criteria...'),
        selected: false,
        description: ko.i18n('components.careSite.criteria.startDate.option.description', 'Filter CareSites by date when Person received care provided by the site'),
        action: function () {
          if (self.Criteria.StartDate() == null)
            self.Criteria.StartDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        text: ko.i18n('components.careSite.criteria.endDate.option.text', 'Add End Date Criteria...'),
        selected: false,
        description: ko.i18n('components.careSite.criteria.endDate.option.description', 'Filter CareSites by date when Person stopped receiving care provided by the site'),
        action: function () {
          if (self.Criteria.EndDate() == null)
            self.Criteria.EndDate(
              new Range({
                Op: "lt",
              })
            );
        },
      },
      {
        text: ko.i18n('components.careSite.criteria.correlatedCriteria.option.text', 'Add Nested Criteria...'),
        selected: false,
        description: ko.i18n('components.careSite.criteria.correlatedCriteria.option.description', 'Apply criteria using the CareSite as the index event'),
        action: function () {
          if (self.Criteria.CorrelatedCriteria() == null)
            self.Criteria.CorrelatedCriteria(
              new CriteriaGroup(null, self.expression.ConceptSets)
            );
        },
      },
    ];

    self.removeCriterion = function (propertyName) {
      self.Criteria[propertyName](null);
    };

    self.indexMessage = ko.i18nformat(
      'components.careSite.criteria.indexData.text',
      'The index date refers to the start of receipt of care from a CareSite of <%= conceptSetName %>.',
      {
        conceptSetName: ko.pureComputed(() => utils.getConceptSetName(
          self.Criteria.CodesetId,
          self.expression.ConceptSets,
          ko.i18n('components.careSite.anyCareSite', 'Any Region')
        ))
      }
    );
  }

  // return compoonent definition
  return {
    viewModel: CareSiteViewModel,
    template: template,
  };
});
