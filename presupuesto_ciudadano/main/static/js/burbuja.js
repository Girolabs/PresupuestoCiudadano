
     function burbuja(archivo)
     {

         formatNumber = d3.format(",d"),
       inicio = 0;
        console.log(archivo);
      if (archivo == ''){
        console.log("no hay archivo");
        inicio = 1;
        archivo = "fuente_financiamiento";
      }

      d3.csv("/static/js/"+archivo +".csv", function (error, data) {

        var width = $("#burbuja").width(), height = 400;
        var fill = d3.scale.ordinal().range(['#607D8B','#C9D997','#009688','#673AB7','#FFA500','#EEBBBA'])
        var svg = d3.select("#burbuja").append("svg")
            .attr("width", width)
            .attr("height", height);
        console.log(data)

        data = data.filter(function (el) {
  return el.anho == "2015";
});
        for (var j = 0; j < data.length; j++) {
          
          dataPrueba = +data[j].monto / 150000000000; //Con esto pongo la escla
          if (dataPrueba < 5 ){
            dataPrueba = 5; // Tamaño minimo de las burbujas pequeñas.
          }
          data[j].radius = dataPrueba; // el radio de la burbuja
          data[j].x = Math.random() * width; // pongo los puntos en cualquier lugar
          data[j].y = Math.random() * height; // pongo los puntos en cualquier lugar
        }

        var padding = 2;
        var maxRadius = d3.max(_.pluck(data, 'radius'));

        var getCenters = function (vname, size) {
          var centers, map;
          centers = _.uniq(_.pluck(data, vname)).map(function (d) {
            return {name: d, value: 1};
          });

          map = d3.layout.treemap().size(size).ratio(1/1);
          map.nodes({children: centers});

          return centers;
        };

        var nodes = svg.selectAll("circle")
          .data(data);

        nodes.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
          .attr("r", function (d) { return d.radius; })
          .style("fill", function (d) { return fill(d.funcion); })
          .on("mouseover", function (d) { showPopover.call(this, d); })
          .on("mouseout", function (d) { removePopovers(); })

        var force = d3.layout.force();


if (inicio == 1){
 console.log("Sin Division");
  draw('');
}
else {
    draw(archivo);
}

 


       

        

        function draw (varname) {
          var centers = getCenters(varname, [$("#burbuja").width(), 400]);
          force.on("tick", tick(centers, varname));
          labels(centers)
          force.start();
        }

        function tick (centers, varname) {
          var foci = {};
          for (var i = 0; i < centers.length; i++) {
            foci[centers[i].name] = centers[i];
          }
          return function (e) {
            for (var i = 0; i < data.length; i++) {
              var o = data[i];
              var f = foci[o[varname]];
              o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
              o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
            }
            nodes.each(collide(.11))
              .attr("cx", function (d) { return d.x; })
              .attr("cy", function (d) { return d.y; });
          }
        }

        function labels (centers) {
          svg.selectAll(".label").remove();

          svg.selectAll(".label")
          .data(centers).enter().append("text")
          .attr("class", "label")
          .text(function (d) { 
            if (typeof d.name !== "undefined"){
               texto_limpio = d.name.split("-")[1];
               if( typeof texto_limpio !== "undefined"){
                if (texto_limpio.length >  30)
                  {
                    texto_limpio = texto_limpio.slice(0,30) + "...";
                  }
                return texto_limpio;
               }
                return d.name;
            }

            })
          .attr("transform", function (d) {
            return "translate(" + (d.x + (d.dx / 3)) + ", " + (d.y + 20) + ")";
          });

        }

        function removePopovers () {
          $('.popover').each(function() {
            $(this).remove();
          }); 
        }

        function showPopover (d) {
          $(this).popover({
            placement: 'auto top',
            container: 'body',
            trigger: 'manual',
            html : true,
            content: function() { 
              return "<br/>Funcion: " + d.funcion.split("-")[1] + 
                    "<br/>Monto: Gs. " + formatNumber(d.monto); ; 
            }
          });
          $(this).popover('show')
        }

        function collide(alpha) {
          var quadtree = d3.geom.quadtree(data);
          return function (d) {
            var r = d.radius + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + padding;
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }
      });
    }//Fin burbuja


    burbuja("");


    $( ".btn" ).click(function() {
      $("#burbuja").html("");
        console.log(this.id)
          burbuja(this.id);
        });