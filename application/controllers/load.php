<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Load extends CI_Controller {

    public function index()
    {
        $url = $this->input->get('url', True);
        $url = urlencode($url);
        echo file_get_contents('http://localhost:8585?url='.$url);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
