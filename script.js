var url = 'https://api.github.com/search/repositories';

var search = new Ractive({
  el: '#container_search',

  template: '#search'

});

var results = new Ractive({
  el: '#container_results',

  template: '#results',

  data: {
    page_counter : 1,
    show_next: false
  }

});

search.on( 'makeQuery', function() {
   if ( search.get('term') ){
      var params = {
        q : search.get('term'),
        per_page : 10,
        page: results.get('page_counter')
      };
      $.get( url , params)
        .done( function(data) {
          results.set({
            total_count : data.total_count,
            reps : data.items
          });
        });
    }
});

results.on( 'nextPage', function() {
  results.set('page_counter', results.get('page_counter') + 1);
  search.fire( 'makeQuery' );
});
