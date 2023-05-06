<?php
class TourController
{
	use Controller;
	protected $model = 'Tour';

	public function index($action, $id = -1, $data = [])
	{
		$this->data_obj = new $this->model;
		switch ($action) {
			case 'getAll':
				$this->getAll();
				break; 
			case 'getItem':
				$this->getItem($id);
				break;
			case 'getAddress':
				$this->getAddress();
				break;
			case 'filterItem':
				$this->filterItem($data);
				break;
			default:
				echo json_encode("API doesn't exist!");
				break;
		}
	}

	private function getAddress()
	{
		if ($result = $this->data_obj->findAddress()) {
			http_response_code(200);
			echo json_encode($result);
		} else {
			http_response_code(404);
			echo json_encode("Can't retrieve item list from database!");
		}
	}
}