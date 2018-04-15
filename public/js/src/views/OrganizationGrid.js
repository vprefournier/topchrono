const Backbone = require('Backbone')
const OrganizationRow = require('./OrganizationRow')
const _ = require('underscore');

class OrganizationGrid extends Backbone.View {
  constructor (options) {
    super(options);

    // Find and initialize the row template.
    let rowTplString = `<div class="col-xs-12 col-sm-6 col-md-4">
	<div class="image-flip" ontouchstart="this.classList.toggle('hover');">
		<div class="mainflip">
			<div class="frontside">
				<div class="card">
					<div class="card-body text-center">
						<p>
							<img class="img-fluid" src="<%- image %>" alt="card image">
							</p>
							<h4 class="card-title"><%- title %></h4><p class="card-text"><%- description %></p><a class="btn btn-primary btn-sm" href="#">
								<i class="fa fa-plus"/>
							</a>
						</div>
					</div>
				</div>
				<div class="backside">
					<div class="card">
						<div class="card-body text-center mt-4">
							<h4 class="card-title">Sunlimetech</h4><p class="card-text">This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.</p>
							<button class="donateNow">Donate NOW</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
    this._rowTpl = _.template(rowTplString);

    this.listenTo(this.collection, 'sync', this.render);
  }

  render () {
    console.log('render mon grid')
    let container = document.createDocumentFragment();
    this.collection.forEach((model) => {
      console.log('je rentre une fois, je rentre deux fois?');
      let row = new OrganizationRow({model : model, rowTemplate : this._rowTpl});
      row.render();
      this.$el.append(row.el);
    });
  }
}

module.exports = OrganizationGrid