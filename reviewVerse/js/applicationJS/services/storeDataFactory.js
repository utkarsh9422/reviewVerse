app.factory('datastoreFactory', function() {

	var dbFactory = {};

	var db_name = "DB_GASCO_1";
	var db_version = "1.0";
	var db = window.openDatabase(db_name, db_version, db_name, 1024 * 1024 * 5);
	var query;

	/*
	 * Distributor Order Table
	 *
	 */

	var table_name_distributor = "DISTRIBUTOR_ORDER_TABLE";
	var col_cust_id_distributor = "CUSTOMER_ID";
	var col_order_id_distributor = "ORDER_ID";
	var col_order_date_distributor = "DATE_OF_ORDER";
	var col_type_quantity_distributor = "TYPE_QUANTITY";
	var col_city_area_distributor = "CITY_AREA";
	var col_status_distributor = "STATUS";

	createDistributorOrderTable();

	function createDistributorOrderTable() {

		db.transaction(function(tx) {
			query = "CREATE TABLE IF NOT EXISTS " + table_name_distributor + " (" + col_cust_id_distributor + " VARCHAR(15) primary key, " + col_order_id_distributor + " VARCHAR(30) , " + col_order_date_distributor + " VARCHAR(15) , " + col_type_quantity_distributor + " VARCHAR(30) , " + col_city_area_distributor + " VARCHAR(30) , " + col_status_distributor + " VARCHAR(15))";
			tx.executeSql(query);
			//alert("Table Created");
		});
	}


	dbFactory.insertDistributorOrderToDB = function(orderData) {

		db.transaction(function(tx) {
			query = "INSERT INTO " + table_name_distributor + " (" + col_cust_id_distributor + ", " + col_order_id_distributor + ", " + col_order_date_distributor + ", " + col_type_quantity_distributor + ", " + col_city_area_distributor + ", " + col_status_distributor + ") VALUES (?,?,?,?,?,?)";
			tx.executeSql(query, [orderData.CustID, orderData.OrderID, orderData.DateofOrder, orderData.Type_Quantity, orderData.City_Area, orderData.Status]);
			//alert("Order Added");
		});
	};

	dbFactory.insertAllDistributorOrdersToDB = function(orders) {
		var len = orders.length;
		for ( i = 0; i < len; i++) {
			dbFactory.insertDistributorOrderToDB(orders[i]);
		}
	};

	dbFactory.getDistributorOrdersFromDB = function(callBack) {
		var result = [];
		db.transaction(function(tx) {
			query = "SELECT * FROM " + table_name_distributor;
			tx.executeSql(query, [], function(tx, dbResult) {

				for (var i = 0; i < dbResult.rows.length; i++) {
					var row = dbResult.rows.item(i);
					result[i] = {
						CustID : row[col_cust_id_distributor],
						OrderID : row[col_order_id_distributor],
						DateofOrder : row[col_order_date_distributor],
						Type_Quantity : row[col_type_quantity_distributor],
						City_Area : row[col_city_area_distributor],
						Status : row[col_status_distributor]
					};
				}
				callBack(result);
			}, null);
		});
	};

	dbFactory.deleteDistributorOrderFromDB = function(orderData) {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_distributor + " WHERE " + col_cust_id_distributor + "= ?";
			tx.executeSql(query, [orderData.CustID]);
		});
	};

	dbFactory.deleteAllDistributorOrdersFromDB = function() {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_distributor;
			tx.executeSql(query);
		});
	};

	/*
	 * Prefilled Consumer Order Table
	 *
	 */

	var table_name_consumer = "CONSUMER_ORDER_TABLE";
	var col_order_id_consumer = "ORDER_ID";
	var col_order_datetime_consumer = "DELIVERY_DATE_TIME";
	var col_distributor_name_consumer = "DISTRIBUTOR_NAME";
	var col_status_consumer = "STATUS";

	createConsumerOrderTable();

	function createConsumerOrderTable() {

		db.transaction(function(tx) {
			query = "CREATE TABLE IF NOT EXISTS " + table_name_consumer + " (" + col_order_id_consumer + " VARCHAR(15) primary key, " + col_order_datetime_consumer + " VARCHAR(15) , " + col_distributor_name_consumer + " VARCHAR(30) , " + col_status_consumer + " VARCHAR(15))";
			tx.executeSql(query);
			//alert("Table Created");
		});
	}


	dbFactory.insertConsumerOrderToDB = function(orderData) {

		db.transaction(function(tx) {
			query = "INSERT INTO " + table_name_consumer + " (" + col_order_id_consumer + ", " + col_order_datetime_consumer + ", " + col_distributor_name_consumer + ", " + col_status_consumer + ") VALUES (?,?,?,?)";
			tx.executeSql(query, [orderData.ORDER_ID,  orderData.DELIVERY_DATE_TIME, orderData.DISTRIBUTOR_NAME, orderData.STATUS],
				function(){
					alert("Order Added");
				},
				function(){
					alert("Failed to add order");
				}
				);
			
		});
		
		
	};

	dbFactory.insertConsumerOrdersToDB = function(orders,callBack) {
		var len = orders.length;
		for ( i = 0; i < len; i++) {
			dbFactory.insertConsumerOrderToDB(orders[i]);
		}
		callBack();
	};

	dbFactory.getConsumerOrdersFromDB = function(callBack) {
		var orders = {};
		db.transaction(function(tx) {
			query = "SELECT * FROM " + table_name_consumer;
			tx.executeSql(query, [], function(tx, results) {

				orders = results.rows;
				var len = orders.length;
				//alert(len);
				callBack(orders);
				//return orders;

			}, null);
		});
	};

	dbFactory.getConsumerOrderDetailsFromDB = function(orderID) {
		var orders = {};
		db.transaction(function(tx) {
			query = "SELECT * FROM " + table_name_consumer+ " WHERE " + col_order_id_consumer + "= "+ orderID;
			tx.executeSql(query, [], function(tx, results) {

				orders = results.rows;
				var len = orders.length;
				//alert(len);
				

			}, null);
		});
	}
	dbFactory.deleteConsumerOrderFromDB = function(orderData) {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_consumer + " WHERE " + col_order_id_consumer + "= ?";
			tx.executeSql(query, [orderData.CustID]);
		});
	};

	dbFactory.deleteAllConsumerOrdersFromDB = function() {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_consumer;
			tx.executeSql(query);
		});
	};

	/*
	 * Notification Table
	 *
	 */

	var table_name_notification = "NOTIFICATION_TABLE";
	var col_notification_id = "NOTIFICATION_ID";
	var col_description = "DESCRIPTION";
	var col_date_time = "DATE_TIME";

	createNotifcationTable();

	function createNotifcationTable() {

		db.transaction(function(tx) {
			query = "CREATE TABLE IF NOT EXISTS " + table_name_notification + " (" + col_notification_id + " VARCHAR(15) primary key, " + col_description + " VARCHAR(100), " + col_date_time + " VARCHAR(100))";
			tx.executeSql(query);
			//alert("Table Created");
		});
	}


	dbFactory.insertNotificationToDB = function(data) {

		db.transaction(function(tx) {
			query = "INSERT INTO " + table_name_notification + " (" + col_notification_id + ", " + col_description + ", " + col_date_time + ") VALUES (?,?,?)";
			tx.executeSql(query, [data.NOTIFICATION_ID, data.DESCRIPTION, data.DATE_TIME]);
			//alert("Order Added");
		});
	};

	dbFactory.insertAllNotificationsToDB = function(datas) {
		var len = datas.length;
		for ( i = 0; i < len; i++) {
			dbFactory.insertNotificationToDB(datas[i]);
		}
	};

	dbFactory.getNotificationsFromDB = function(callBack) {
		var datas = [];
		db.transaction(function(tx) {
			query = "SELECT * FROM " + table_name_notification;
			tx.executeSql(query, [], function(tx, results) {

				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					datas[i] = {
						NotificationID : row[col_notification_id],
						Desc : row[col_description],
						Date_Time : row[col_date_time],

					};
				}

				//datas = results.rows;
				//var len = datas.length;
				//alert(len);
				callBack(datas);
				//return orders;

			}, null);
		});
	};

	dbFactory.deleteNotifcationFromDB = function(data) {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_notification + " WHERE " + col_notification_id + "= ?";
			tx.executeSql(query, [data.NotificationID]);
		});
	};

	dbFactory.deleteAllNotifcationsFromDB = function() {

		db.transaction(function(tx) {
			query = "DELETE FROM " + table_name_notification;
			tx.executeSql(query);
		});
	};

	return dbFactory;

});
