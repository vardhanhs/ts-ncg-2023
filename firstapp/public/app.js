document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    const indicatorSelect = document.getElementById('indicator-select');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const loadChartButton = document.getElementById('load-chart');
    const savedViewsTable = document.getElementById('saved-views');
  
    // Add event listener to the load chart button
    loadChartButton.addEventListener('click', () => {
      const countryISOCode = countrySelect.value;
      const indicatorId = indicatorSelect.value;
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
      // Call a function to load chart using the selected options
      loadChart(countryISOCode, indicatorId, startDate, endDate);
    });
  
    // Call a function to load saved views
    loadSavedViews();
  

    function loadChart(countryISOCode, indicatorId, startDate, endDate) {
        // const countryCache = localStorage.getItem('countryCache');
        // const indicatorCache = localStorage.getItem('indicatorCache');
      
        // if (countryCache && indicatorCache) {
        //   // Data is available in local storage, use it to populate the country and indicator selects
        //   const countries = JSON.parse(countryCache);
        //   const indicators = JSON.parse(indicatorCache);
        //   populateSelectOptions(countrySelect, countries);
        //   populateSelectOptions(indicatorSelect, indicators);
        // } else {
        //   // Data is not available in local storage, fetch from World Bank API
        //   const countryUrl = 'https://api.worldbank.org/v2/country?format=json&per_page=500';
        //   const indicatorUrl = 'https://api.worldbank.org/v2/indicator?format=json&per_page=500';
      
        //   axios.all([axios.get(countryUrl), axios.get(indicatorUrl)])
        //     .then(axios.spread((countryResponse, indicatorResponse) => {
        //       const countries = countryResponse.data[1];
        //       const indicators = indicatorResponse.data[1];
      
        //       // Cache the data in local storage
        //       localStorage.setItem('countryCache', JSON.stringify(countries));
        //       localStorage.setItem('indicatorCache', JSON.stringify(indicators));
      
        //       populateSelectOptions(countrySelect, countries);
        //       populateSelectOptions(indicatorSelect, indicators);
        //     }))
        //     .catch(error => {
        //       console.error('Failed to load countries and indicators:', error);
        //     });
        // }
    
            const apiUrl = `https://api.worldbank.org/v2/country/${countryISOCode}/indicator/${indicatorId}?format=json&date=${startDate}:${endDate}`;
          
            axios.get(apiUrl)
              .then(response => {
                // Process the API response and extract the necessary data for chart rendering
                const data = response.data[1];
                console.log(response);
          
                const chartData = {
                  labels: data.map(item => item.date),
                  datasets: [{
                    label: 'Value',
                    data: data.map(item => item.value),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                  }]
                };
          
                const chartOptions = {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                };
          
                const ctx = document.getElementById('chart').getContext('2d');
                new Chart(ctx, {
                  type: 'bar',
                  data: chartData,
                  options: chartOptions
                });
          
                // Save the chart as a view using REST API
                // Implement code to prompt for a name and send the chart data to the backend
              })
              .catch(error => {
                console.error('Failed to load chart data:', error);
              });
          
      }
      
    //   function loadSavedViews() {
    //     const savedViews = localStorage.getItem('savedViews');
      
    //     if (savedViews) {
    //       // Saved views are available in local storage, use them to populate the table
    //       const views = JSON.parse(savedViews);
    //       populateSavedViewsTable(views);
    //       addDeleteEventListeners();
    //     } else {
    //       // Saved views are not available in local storage, fetch from API
    //       // Implement code to fetch saved views from API and populate the table
      
    //       // For now, let's assume we have an empty array of views
    //       const views = [];
    //       populateSavedViewsTable(views);
    //       addDeleteEventListeners();
    //     }
    //   }
      
      function populateSelectOptions(selectElement, data) {
        for (const item of data) {
          const option = document.createElement('option');
          option.value = item.id;
          option.textContent = item.name;
          selectElement.appendChild(option);
        }
      }
      
      function populateSavedViewsTable(views) {
        const tbody = savedViewsTable.querySelector('tbody');
        tbody.innerHTML = '';
      
        for (const view of views) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${view.name}</td>
            <td>${view.country}</td>
            <td>${view.indicator}</td>
            <td>${view.chartType}</td>
            <td>${view.dateRange}</td>
            <td>${view.createdTimestamp}</td>
            <td><button class="delete-view">Delete</button></td>
          `;
          tbody.appendChild(row);
        }
      }
      
      function addDeleteEventListeners() {
        const deleteButtons = document.getElementsByClassName('delete-view');
      
        for (const button of deleteButtons) {
          button.addEventListener('click', () => {
            // Implement code to delete the view using REST API
            // Retrieve the view data and remove it from the table
          });
        }
      }
        
  });
  