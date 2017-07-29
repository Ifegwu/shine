import { EventEmitter,
         Component   }   from "@angular/core";
import { ActivatedRoute }   from "@angular/router"
import { Http        }   from "@angular/http"
import                        "rxjs/add/operator/map";
import   template      from "./template.html";

var CreateCustomerComponent = Component({
  selector: "shine-create-customer",
  template: template,
}).Class({
  constructor: [
    ActivatedRoute,
    Http,
    function(activatedRoute, http) {
      this.activatedRoute = activatedRoute;
      this.http           = http;
      this.customer = null;
      this.create_customer = null;
      this.creatCustomer = new EventEmitter();
    }
  ],
  ngOnInit: function() {
    var self = this;
  },
  ngOnChanges: function(changes) {
    if ( changes.create_customer) {
      this.create_customer = changes.create_customer.createValues;
      this.createCustomerInfo();
    }
    else {
      this.create_customer = null;
      this.customer = null;
    }
  },
  customer: function() {
    var self = this;
    self.http.post("/create_customer_info" + self.createCustomer).
      subscribe(
        function(response) {
          self.customer= response.json().create_customer_info;
        },
        function(response) {
          window.alert(response);
        }
      );
  },
  save: function(save) {
    this.createCustomer.emit(save);
  }
});

export { CreateCustomerComponent };
