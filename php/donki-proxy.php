<?php
	/*
		File Name:  yelp-proxy.php
		Author: Tonethar
		Date: 12/7/2018
		Description: This is a proxy server that is customized for the Yelp API.
		The reason we need a proxy server is that the Yelp API has CORS is turned off.
		`term` and `location` parameters are required
		Example Usage: https://api.yelp.com/v3/businesses/search?term=food&location=rochester
		API Documentation: https://www.yelp.com/developers/documentation/v3/get_started
	*/
        $startDate = $_GET["start"];
        $endDate = $_GET["end"];
        $type = $_GET["type"];
		$BASE_URL ="https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/";
		ini_set("memory_limit",-1);

		$filedata = file_get_contents($BASE_URL . $type . "?startDate=" . $startDate . "&endDate=" . $endDate);
     	
    	// send a content-type header for the response so that the client browser will understand what is coming back
			header("content-type: application/json");
			header("Access-Control-Allow-Origin: *");
			
    	// echo the content from the downloaded file
    	echo $filedata;
        exit(); //You can also call die() - according to the PHP spec they are identical
  
    
    /*
    	DOCS:
    	http://php.net/manual/en/function.ini-set.php
    	http://php.net/manual/en/ini.core.php#ini.memory-limit
    	http://php.net/manual/en/reserved.variables.request.php
    	http://php.net/manual/en/function.array-key-exists.php
    	http://php.net/manual/en/function.print-r.php
    	http://php.net/manual/en/language.operators.string.php
			http://php.net/manual/en/function.str-replace.php
      http://php.net/manual/en/function.exit.php
      http://php.net/manual/en/function.die.php
      http://php.net/manual/en/function.stream-context-create.php
      http://php.net/manual/en/function.file-get-contents.php
      http://php.net/manual/en/function.echo.php
    */
?>