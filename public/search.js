Schizo = {
  1: 'Paranoid schizophrenia',
  2: 'Disorganized schizophrenia',
  3: 'Catatonic schizophrenia',
  4: 'Undifferentiated schizophrenia',
  5: 'Residual schizophrenia',
};
Approxi = {
  1: '$0-$15,000',
  2: '$15,001-$25,000',
  3: '$25,001-$40,000',
  4: '$40,001-$55,000',
  5: '$55,001-$75,000',
  6: '$75,001-$100,000',
  7: '$100,001-$150,000',
  8: 'Greater than $150,001',
};
Ethnic = {
  1: 'Hispanic or Latino',
  2: 'Not Hispanic or Latino',
};
Ethnicity = {
  210: 'European',
  211: 'Anglo–Saxon',
  212: 'Northern European',
  213: 'West European',
  214: 'East European, Slavic',
  215: 'Russian',
  216: 'Mediterranean',
  220: 'African, sub-Saharan',
  230: 'African, northeastern',
  240: 'Southeast Asian',
  250: 'All Other Asian',
  260: 'Native Americans',
  270: 'Admixed',
  271: 'Hispanic',
  272: 'Puerto Rican Hispanic',
  273: 'Mexican Hispanic',
  280: 'Special Populations',
  290: 'Other',
};
Race = {
  1: 'American Indian/Alaska Native',
  2: 'Asian',
  3: 'Native Hawaiian or Other Pacific Islander',
  4: 'Black or African-American',
  5: 'White',
  6: 'More Than One Race',
};
Marital = {
  1: 'Married',
  2: 'Separated',
  3: 'Divorced',
  4: 'Widowed',
  5: 'Never Married',
};
Military_dis = {
  1: 'Honorable',
  2: 'General',
  3: 'Medical',
  4: 'Without Honor',
  5: 'Undesirable',
  6: 'Dishonorable',
  7: 'Not Discharged, Currently in Active or Reserve Military',
};
Military_rej = {
  1: 'Never called up or never rejected (include females)',
  2: 'Rejected for physical defect',
  3: 'Rejected for low IQ',
  4: 'Rejected for delinquency or criminal record',
  5: 'Rejected for other psychiatric reasons',
  6: 'Rejected for reasons uncertain',
};
Religion = {
  1: 'Catholic',
  2: 'Protestant',
  3: 'Jewish',
  4: 'Moslem',
  5: 'Not Affiliated',
  6: 'Other',
};
Smoked = {
  0: 'No',
  1: 'Yes, currently smoking',
  2: 'Yes, smoked in the past',
};
const colTypeObj = {};
const getFilters = function (data) {
  const newArr = [];
  let nieWiem = {};
  for (const [key, value] of Object.entries(data)) {
    value.forEach((val) => {
      for (const [key1, value1] of Object.entries(val)) {
        if (value1 == 'integer' || value1 == 'smallint' || value1 == 'bigint') {
          colTypeObj[`${key}.${key1}`] = 'integer';
          nieWiem = {
            id: `${key}.${key1}`,
            label: key1,
            type: 'integer',
            optgroup: key,
            validation: { min: 0 },
          };
          if (key1 == 'schizophrenia') { nieWiem.input = 'select'; nieWiem.values = Schizo; } else if (key1 == 'approximate_income') { nieWiem.input = 'select'; nieWiem.values = Approxi; } else if (key1 == 'ethnic_category') { nieWiem.input = 'select'; nieWiem.values = Ethnic; } else if (key1 == '' || key1 == 'father_ethnicity_1' || key1 == 'father_ethnicity_2' || key1 == 'father_ethnicity_3' || key1 == 'father_ethnicity_4' || key1 == 'mother_ethnicity_1' || key1 == 'mother_ethnicity_2' || key1 == 'mother_ethnicity_3' || key1 == 'mother_ethnicity_4') { nieWiem.input = 'select'; nieWiem.values = Ethnicity; } else if (key1 == 'marital_status') { nieWiem.input = 'select'; nieWiem.values = Marital; } else if (key1 == 'military_discharge') { nieWiem.input = 'select'; nieWiem.values = Military_dis; } else if (key1 == 'military_rejected') { nieWiem.input = 'select'; nieWiem.values = Military_rej; } else if (key1 == 'religion') { nieWiem.input = 'select'; nieWiem.values = Religion; } else if (key1 == 'reported_race') { nieWiem.input = 'select'; nieWiem.values = Race; } else if (key1 == 'smoked_cigarettes') { nieWiem.input = 'select'; nieWiem.values = Smoked; }
        } else if (value1 == 'real') {
          colTypeObj[`${key}.${key1}`] = 'double';
          nieWiem = {
            id: `${key}.${key1}`,
            label: key1,
            type: 'double',
            optgroup: key,
            validation: { min: 0, step: 0.01 },
          };
        } else if (value1 == 'text' || value1 == 'character') {
          colTypeObj[`${key}.${key1}`] = 'string';
          nieWiem = {
            id: `${key}.${key1}`, label: key1, type: 'string', optgroup: key,
          };
        } else if (value1 == 'date') {
          colTypeObj[`${key}.${key1}`] = 'date';
          nieWiem = {
            id: `${key}.${key1}`,
            label: key1,
            type: 'date',
            optgroup: key,
            validation: {
              format: "'YYYY/MM/DD'",
            },
            plugin: 'datepicker',
            plugin_config: {
              format: "'yyyy/mm/dd'",
              todayBtn: 'linked',
              todayHighlight: true,
              autoclose: true,
            },
          };
        } else if (value1 == 'boolean') {
          colTypeObj[`${key}.${key1}`] = 'boolean';
          nieWiem = {
            id: `${key}.${key1}`,
            label: key1,
            type: 'boolean',
            optgroup: key,
            input: 'radio',
            values: { true: 'True', false: 'False' },
            operators: ['equal'],
          };
        }
        newArr.push(nieWiem);
        nieWiem = {};
      }
    });
  }
  return newArr;
};
$(document).ready(() => {
  myCheck = $('#check').clone();
  myAccord = $('.card').clone();
  myFrom = $('#from1').clone();
  myWhere = $('#where1').clone();
  nameOfColumns = '';
  $('#run').attr('disabled', true);
  $('.temp').hide();
  columnListInAccordion(data);
  $('#accordion').hide();
  $('#bt1').click(() => {
    if (even) { doEven(); } else {
      nameOfColumns = doOdd();
      console.log(`to sa kolumny ${nameOfColumns}`);
    }
    even = !even;
  });
  filterArr = getFilters(data);
  $('#builder').on('afterUpdateRuleValue.queryBuilder', (e, rule) => {
    if (rule.filter.plugin === 'datepicker') {
      rule.$el.find('.rule-value-container input').datepicker('update');
    }
  });

  $('#builder').queryBuilder({
    plugins: ['bt-tooltip-errors', 'chosen-selectpicker'],

    filters: filterArr,
  });

  $('#reset').on('click', () => {
    location.reload();
    // $('#builder').queryBuilder('reset');
  });
  $('#run').on('click', () => {
    const result = $('#builder').queryBuilder('getSQL', 'question_mark');
    if (result.sql.length) {
      arr = JSON.stringify(result.params, null, 2);
      arr = JSON.parse(arr);
      str = trueSQL(result.sql, arr, colTypeObj);
      $('#btexcel').show();
      queryStr = `SELECT ${nameOfColumns}${strJoin} WHERE ${str};`;
      createTable(queryStr);
    }
  });
  $('#excel').click(() => {
    $('#showData').table2excel({
      exclude: '.noExl',
      name: 'Worksheet Name',
      filename: 'NewTable',
      fileext: '.xls',
    });
  });
});
