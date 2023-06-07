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
	public function findSurvey($tour_id)
	{
		$query = "call GetAllSurveyOfTouristAttraction($tour_id);";
		return $this->query($query);
	}

	public function findAvgRating($tour_id)
	{
		$query = "select calculate_average_rating($tour_id) as avg_rating;";
		return $this->query($query);
	}

	public function where($tour_id)
	{
		$query = "select * from $this->table where TID = $tour_id;";
		return $this->query($query);
	}
}