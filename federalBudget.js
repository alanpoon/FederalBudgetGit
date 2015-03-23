function federalChart(){
	// configurable chart options
		var viewId='preview';
		var width=500;
		var height=450;
		var margin=[0,30,170,20];
		var root={'values':[]};
		var groupCount=2;
		var ToolTipContainer;
		var holding={};
		var  retDes=function(d) {
                 var ret = d.source_description;
                 ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;
                 return ret;
             };
	
		var ToolTipContainer_Div={};
		var ToolTipContainer_But={};

		var ToolTipContainer_Spend={};
		var tree;
		var diagonal;
		var vis;
		var Fselect={};
		var colors=["#bd0026","#fecc5c", "#fd8d3c", "#f03b20", "#B02D5D",
        "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF",
        "#d7b5d8","#dd1c77","#5A0C7A","#5A0C7A"];
		var dataGroupHex="#dataGroup_"+viewId;
		var dataGroupKey="navBar";
		var maxBubbleSize=50;
		var linkSize=180;
		var navBarMinWidth=150;
			var formatClass = {
     '1': {
         'cToggleAccept': 'All', //salary
         'formatValue': function(val) {
             return d3.round(val,2);
         }
 
     },
     '2': {
         'cToggleAccept': 'All', //
         'formatValue': function(val) {
             return d3.round(val,2);
         }
     },
     '3': {
         'cToggleAccept': 'Sales', //
         'formatValue': function(val) {
             return d3.round(val,2);
         }
     }
 };
	function chart(selection) {

		selection.each(function(data) {
		debugFn2();
		d3select();
		 multiSelectFn(jQuery);
		
		initialize(groupCount);
		setup();
		 initializeNavBar(dataGroupKey,dataGroupHex,viewId,ToolTipContainer);
		 initializeToolTip1(viewId,ToolTipContainer);
		 initializeSliders(dataGroupHex,viewId);
	
		});
		}	
	chart.viewId = function(value) {
		if (!arguments.length) return viewId;
		viewId = value;
		return chart;
	};	
	chart.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return chart;
	};	
	chart.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return chart;
	};	
	chart.margin = function(value) {
		if (!arguments.length) return margin;
		margin = value;
		return chart;
	};
	chart.root = function(value) {
		if (!arguments.length) return root;
		root = value;
		return chart;
	};
	chart.groupCount = function(value) {
		if (!arguments.length) return groupCount;
		groupCount = value;
		return chart;
		};
	chart.ToolTipContainer = function(value){
		if (!arguments.length) return ToolTipContainer;
		ToolTipContainer = value;
		return chart;
	};
		chart.retDes = function(value){
		if (!arguments.length) return retDes;
		retDes = value;
		return chart;
	};
	chart.Fselect = function(value){
		if (!arguments.length) return Fselect;
		Fselect = value;
		return chart;
	};
	chart.colors = function(value){
		if (!arguments.length) return colors;
		colors = value;
		return chart;
	};
	chart.dataGroupHex = function(value){
		if (!arguments.length) return dataGroupHex;
		dataGroupHex = value;
		return chart;
	};
	chart.dataGroupKey = function(value){
		if (!arguments.length) return dataGroupKey;
		dataGroupKey = value;
		return chart;
	};
	chart.maxBubbleSize = function(value){
		if (!arguments.length) return maxBubbleSize;
		maxBubbleSize = value;
		return chart;
	};
	chart.linkSize = function(value){
		if (!arguments.length) return linkSize;
		linkSize = value;
		return chart;
	};
		chart.navBarMinWidth = function(value){
		if (!arguments.length) return navBarMinWidth;
		navBarMinWidth = value;
		return chart;
	};
	chart.formatClass = function(value){
		if (!arguments.length) return formatClass;
		formatClass = value;
		return chart;
	};
	chart.modelYAxisObj = function(value){
		if (!arguments.length) return modelYAxisObj;
		modelYAxisObj = value;
		return chart;
	};

	return chart;
	function debugFn2(){
		initializeNavBar=function(dataGroupKey,dataGroupHex,viewId,ToolTipContainer){
		console.log("r root",root);
	      root.values.forEach(toggleAll);
        //toggle(root.values[2]);	        
			if (dataGroupKey === 'navBar') {
	
			var dataGroupContent = d3.select(dataGroupHex);
            dataGroupContent.append("td").attr('width',(parseInt(navBarMinWidth)+30)+'px')
                .append("select").attr("id", 'periodSelect_' + viewId);
				var periodSelect_hex = '#periodSelect_' + viewId;
	         var periodSelect_el = $(periodSelect_hex).multiselect({
				minWidth:navBarMinWidth,
                selectedList: 1,
                multiple: false,
                click: function(event, ui) {
                    Fselect['spendField'] = 'sum_'+ui.value;
					Fselect['actField'] ='sum_'+ui.value;
					   setup();
                update(root, groupCount,viewId);
            }});
		
			  addPeriodOptions(periodSelect_el,ToolTipContainer);
			  } else {
			  
			       $(periodSelect_hex).empty();
				   	  }
					  console.log("root......",root);
			 update(root, groupCount,viewId);
			};
	initializeToolTip1=function(viewId,ToolTipContainer){
				// Tooltip
			var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip_"+viewId)
				.style("font", "Arial black;")
				.style("font-size", "11px")
				.style("margin", "8px")
				.style("padding", "5px")
				.style("border", "1px solid #000")
				.style("background-color", "rgba(255,255,255,1)")
				.style("position", "absolute")
				.style("z-index", "1001")
				.style("opacity", "0.8")
				.style("border-radius", "3px")
				.style("box-shadow", "5px 5px 5px #888")
				.style("visibility", "hidden");
	
	
	};
	
	initializeSliders = function(dataGroupHex,viewId){
	//bubbleSlider
	var subBubbleDiv=d3.select(dataGroupHex).append("td").attr("class",'sliderClass');
	subBubbleDiv.append("tr").append("div").attr("id","bubbleSlider_"+viewId);
	subBubbleDiv.append("tr").append("div").text("Bubble Scale");
	$('#bubbleSlider_'+viewId).slider(
		{min:30,
		max:80,
		values:[50],
		change:function(event,ui){
		maxBubbleSize=ui.value;
		   setup();
			update(root, groupCount,viewId);
		}
		}
	); 
	d3.select('#bubbleSlider_'+viewId).style("width",100);
	
	//linkSlider
	var subLinkDiv=d3.select(dataGroupHex).append("td").attr("class",'sliderClass');
	subLinkDiv.append("tr").append("div").attr("id","linkSlider_"+viewId);
	subLinkDiv.append("tr").append("div").text("Link Scale");
	$('#linkSlider_'+viewId).slider(
		{min:120,
		max:200,
		values:[170],
		change:function(event,ui){
		linkSize=ui.value;
		   setup();
			update(root, groupCount,viewId);
		}
		}
	);
	d3.select('#linkSlider_'+viewId).style("width",100);
	//heightSlider
	var subHeightDiv=d3.select(dataGroupHex).append("td").attr("class",'sliderClass');
	subHeightDiv.append("tr").append("div").attr("id","heightSlider_"+viewId);
	subHeightDiv.append("tr").append("div").text("Height Scale");
	$('#heightSlider_'+viewId).slider(
		{min:300,
		max:800,
		values:[450],
		change:function(event,ui){
		height=ui.value;
		
	
		 tree.size([height, width]);
		 d3.select("#body_"+viewId+" svg").attr("height", height + parseInt(margin[0]) + parseInt(margin[2]));

		   setup();
			update(root, groupCount,viewId);
		}
		}
	);
	d3.select('#heightSlider_'+viewId).style("width",100);
	};
	addPeriodOptions = function(periodSelect_el,ToolTipContainer) {
	console.log("addPeriodOptions periodSelect_el",periodSelect_el);
	
        _.each(_.values(ToolTipContainer), function(m) {
	
         //   var opt = $('&lt;option /&gt;', {
		    var opt = $('<option />', {
                value: m,
                text: m
            });
				
            opt.appendTo(periodSelect_el);
        });

        periodSelect_el.multiselect('refresh');
    };
    d3select = function() {
	
        tree = d3.layout.tree();

        tree.children(function(d) {
            return d.values;
        });
        tree.size([height, width]);
        diagonal = d3.svg.diagonal()
            .projection(function(d) {
             //   return [d.y, d.x];
			    return [d.y, d.x];
            });

        vis = d3.select("#body_" + viewId).append("svg:svg")
            .attr("width", width + parseInt(margin[1]) + parseInt(margin[3]))
            .attr("height", height + parseInt(margin[0]) + parseInt(margin[2]))
            .append("svg:g")
            .attr("transform", "translate(" + parseInt(margin[3]) + "," + parseInt(margin[2]) + ")");
    };
	
   
    initialize = function(groupCount) {
        var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
            return 'groupby' + m;
        });
        _.each(groupbyRange, function(d, i) {
           holding[d + '_Max'] = {};
            holding[d + '_Radius'] = {};
        });
       alreadySummed = false;
        data_i = 0;

        var nodes = tree.nodes(root).reverse();
        tree.children(function(d) {
            return d.children;
        });
	
        for (var i = 0; i < Fselect.sumField.length; i++) {
            _.each(groupbyRange, function(d) {
                holding[d + '_Max']['sum_' + Fselect.sumField[i]] = 0;
            });
        }
        sumNodes([root],groupCount,viewId);
    };

    setup = function() {
        var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
            return 'groupby' + m;
        });
        _.each(groupbyRange, function(d, i) {
            holding[d + '_Radius'] = d3.scale.sqrt()
                .domain([0,holding[d+'_Max'][Fselect.spendField]])
                .range([1, parseInt(maxBubbleSize)]);

        });

    };
	} //end debug2Fn()
	

function toggleAll(d) {
    if (d.values && d.values.actuals) {
        d.values.actuals.forEach(toggleAll);
        toggle(d);
    } else if (d.values) {
        d.values.forEach(toggleAll);
        toggle(d);
    }
}

function setSourceFields(child, parent,viewId) {
    if (parent) {

        for (var i = 0; i < Fselect.sourceField.length; i++) {
            var sourceField = Fselect.sourceField[i];

            if (child[sourceField] != undefined) {
                child["source_" + sourceField] = child[sourceField];

            }
            parent["source_" + sourceField] = (child["source_" + sourceField]) ? child["source_" + sourceField] : child[sourceField];
        }
    }

}


function sumNodes(nodes, groupCount,viewId) {
    for (var y = 0; y < nodes.length; y++) {
        var node = nodes[y];
		if(node.depth==0) node.key='Total';
        if (node.children) {
            sumNodes(node.children,groupCount,viewId);
            for (var z = 0; z < node.children.length; z++) {
                var child = node.children[z];
                for (var i = 0; i < Fselect.sumField.length; i++) {
                    if (isNaN(node["sum_" + Fselect.sumField[i]])) node["sum_" + Fselect.sumField[i]] = 0;
                    node["sum_" + Fselect.sumField[i]] += Number(child["sum_" + Fselect.sumField[i]]);

                    //Set scales;
                    if ((node.parent)) {
                        for (var n = 1; n <= groupCount; n++) {
                            if (node.depth == n) {
                                holding['groupby'+n + '_Max']["sum_" + Fselect.sumField[i]] = Math.max(parseInt(holding['groupby'+n + '_Max']["sum_" + Fselect.sumField[i]]), Number(node["sum_" + Fselect.sumField[i]]));
							
                            }
                        }
                        setSourceFields(node, node.parent,viewId);
				
                    }
                }
            }
        } else {
            for (var i = 0; i < Fselect.sumField.length; i++) {
                node["sum_" + Fselect.sumField[i]] = Number(node[Fselect.sumField[i]]);
                if (isNaN(node["sum_" + Fselect.sumField[i]])) {
                    node["sum_" + Fselect.sumField[i]] = 0;
                }
            }
        }
        setSourceFields(node, node.parent,viewId);
    }

}


function update(source, groupCount,viewId) {

    var duration = d3.event && d3.event.altKey ? 2000 : 200;

    var nodes = tree.nodes(root).reverse();

    var depthCounter = 0;

    // Normalize for fixed-depth.
    nodes.forEach(function(d) {
        d.y = d.depth * parseInt(linkSize);
        d.numChildren = (d.children) ? d.children.length : 0;

        if (d.depth == 1) {
            d.linkColor = colors[(depthCounter % (colors.length - 1))];
            depthCounter++;
        }

        if (d.numChildren == 0 && d._children) d.numChildren = d._children.length;

    });

    //Set link colors
    nodes.forEach(function(d) {
        var obj = d;

        while ((obj.source && obj.source.depth > 1) || obj.depth > 1) {
            obj = (obj.source) ? obj.source.parent : obj.parent;
        }

        d.linkColor = (obj.source) ? obj.source.linkColor : obj.linkColor;

    });

    // Update the nodes…
    var node = vis.selectAll("g.node")
        .data(nodes, function(d) {
            return d.id || (d.id = ++data_i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) {
           return "translate(" + source.y0 + "," + source.x0 + ")";
	    
        })
        .on("click", function(d) {
            if (d.numChildren > 50) {
                alert(d.key + " has too many departments (" + d.numChildren + ") to view at once.");
            } else if(  d.depth <groupCount) {
                toggle(d);
                update(d,groupCount,viewId);
            }
        });

    nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .on("mouseover", function(d) {
            node_onMouseOver(d, groupCount,viewId);
        })
        .on("mouseout", function(d) {
		d3.select(".tooltip_"+viewId).style("visibility", "hidden");
        })
        .style("fill", function(d) {
            return d.source ? d.source.linkColor : d.linkColor;
        })
        .style("fill-opacity", ".8")
        .style("stroke", function(d) {
            return d.source ? d.source.linkColor : d.linkColor;
        });


    nodeEnter.append("svg:text")
        .attr("x", function(d) {
            return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr("text-anchor",
            function(d) {
                return d.children || d._children ? "end" : "start";
            })
        .text(function(d) {
            var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
                return 'groupby' + m;
            });
            if (d.depth) {
                var ret = d.key;
            } 
            _.each(groupbyRange, function(m, n) {
                if (d.depth == (n + 2)) {
                    var ret = d['source_' + m];
                }
            });
            ret = (String(ret).length > 25) ? String(ret).substr(0, 22) + "..." : ret;
            return ret;
        })
        .on("mouseover", function(d) {
            node_onMouseOver(d, groupCount,viewId);
        })
        .on("mouseout", function(d) { 
		d3.select(".tooltip_"+viewId).style("visibility", "hidden");
        })
        .style("fill-opacity", "0");

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
	
           return "translate(" + d.y + "," + d.x + ")";
	
        });

    nodeUpdate.select("circle")
        .attr("r", function(d) {
            var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
                return 'groupby' + m;
            });
            var rSize;
            if (d.depth == 0) {
                rSize = 10;
            }
            _.each(groupbyRange, function(m, n) {
                if (d.depth == (n + 1)) {
                    var ret = holding[m + '_Radius'](d[Fselect.spendField]);
                    rSize = (isNaN(ret) ? 2 : ret);
                }
            });
            return rSize;
        })
        .style("fill", function(d) {
            return d.source ? d.source.linkColor : d.linkColor
        })
        .style("fill-opacity", function(d) {
            var ret = ((d.depth + 1) / 5);
            return ret;
        });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
		var newX=source.x+30;
           // return "translate(" + source.y + "," + source.x + ")";
		   return "translate(" + source.y + "," + newX + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function(d) {
            return d.target.id;
        });

    var rootCounter = 0;

    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            if (Number(d.target[Fselect.spendField]) > 0) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            } else {
                null;
            }
        })
        .style("stroke", function(d, i) {
            var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
                return 'groupby' + m;
            });
            if (d.source.depth == 0) {
                rootCounter++;
                return (d.source.children[rootCounter - 1].linkColor);
            } else {
                return (d.source) ? d.source.linkColor : d.linkColor;
            }
        })
        .style("stroke-width", function(d, i) {
            var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
                return 'groupby' + m;
            });
            var strokeSize;
            _.each(groupbyRange, function(m, n) {
                if (d.source.depth == n) {
			
                    var ret = holding[m + '_Radius'](d.target[Fselect.spendField]) * 2;
                    strokeSize = (isNaN(ret) ? 4 : ret);
                }
            });
            return strokeSize;
        })
        .style("stroke-opacity", function(d) {
            var ret = ((d.source.depth + 1) / 4.5)
            if (d.target[Fselect.spendField] <= 0) ret = .1;
            return ret;
        })
        .style("stroke-linecap", "round")
        .transition()
        .duration(duration);
    //      .attr("d", diagonal);


    // Transition links to their new position.
    var linkUpdate = link.transition()
        .duration(duration)
        .attr("d", diagonal);

    linkUpdate
        .style("stroke-width", function(d, i) {
            var groupbyRange = _.map(_.range(1, groupCount + 1), function(m) {
                return 'groupby' + m;
            });
            var strokeSize;
            _.each(groupbyRange, function(m, n) {
                if (d.source.depth == n) {
                    var ret = holding[m + '_Radius'](Number(d.target[Fselect.spendField])) * 2;
                    strokeSize = (isNaN(ret) ? 4 : ret);
                }
            });
            return strokeSize;
        })
     
        .style("stroke-opacity", function(d) {
            var ret = ((d.source.depth + 1) / 4.5)
            if (d.target[Fselect.spendField] <= 0) ret = .1;
            return ret;
        })


    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", diagonal)
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

}

function node_onMouseOver(d, groupCount,viewId) {
    var formatNumber = d3.format(",^ $");
    var formatCurrency = function(d) {
        return formatNumber(d)
    };
 /*
     _.each(groupbyRange, function(m, n) {
        if (d.depth == (n + 1)) {

			var headerText=d['source_' + m];
        } else var headerText="";
    }); */
	var content = "<b>" + d.key + "</b><hr>";
	
	_.each(Fselect['sumField'],function(m,n){
		var dNop='sum_'+m;
		if(dNop==Fselect['spendField']) {
		content=content+"<b>"+m+": "+formatClass[modelYAxisObj[m]]['formatValue'](d['sum_'+m]) +"</b><br>";
		} else content=content+m+": "+formatClass[modelYAxisObj[m]]['formatValue'](d['sum_'+m])+"<br>";
	
	});
		
		d3.select(".tooltip_"+viewId).style("visibility", "visible")
			.style("top", (d3.event.pageY-35)+"px")
			.style("left", d3.event.pageX+"px")
			.html(content);
}

function toggleButton(button,viewId) {
    button.attr("class", "selected");
    for (var propertyName in ToolTipContainer_But) {

        var localButtonArr = _.keys(ToolTipContainer_But);
        var restlocalButtonArr = _.reject(localButtonArr, function(num) {
            return num == propertyName;
        });
        if (button == ToolTipContainer_But[propertyName]) {
            _.each(restlocalButtonArr, function(m) {
				ToolTipContainer_But[m].attr("class", "unselected");

            });
        }

    }
}


// Toggle children.
function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
}

}
