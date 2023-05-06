<?php

class Tour
{
	use Model;
	protected $table = '`Tourist Attraction`';

	public function findAddress()
	{
		$query = "call GetAllTouristAttrAddress();";
		return $this->query($query);
	}

}