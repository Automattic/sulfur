var app = app || {};

app.mediaView = Backbone.View.extend({
        id: 'filegrid',
        template: _.template( $( '#media-template' ).html() ),

        render: function() {
                this.$el.html(
                        this.template()
                );

                $( '#filegrid' ).html( this.el )

                return this;
        }
});