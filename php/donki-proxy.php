<?php
	/*
		proxy server for the donki api
	*/
        $startDate = $_GET["start"];
        $endDate = $_GET["end"];
        $type = $_GET["type"];
		$BASE_URL ="https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/";
		ini_set("memory_limit",-1);

		//all formating is done in js, so vars can be used directly
		$filedata = file_get_contents($BASE_URL . $type . "?startDate=" . $startDate . "&endDate=" . $endDate);
     	
    	// send a content-type header for the response so that the client browser will understand what is coming back
		header("content-type: application/json");
		header("Access-Control-Allow-Origin: *");
			
    	// echo the content from the downloaded file
    	echo $filedata;
        exit();
?>