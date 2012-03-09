<?php

class HowItWorksController extends Zend_Controller_Action
{

    public function init()
    {
       $this-> view -> headScript() -> appendFile('/resources/js/howitworks/main.js', 'text/javascript');
	   if($this->_request->isXmlHttpRequest())
		{
			$this->_helper->layout->disableLayout();
		}
    }

    public function indexAction()
    {
        // action body
    }

    public function electricCarsAction()
    {
        // action body
    }

    public function switchableBatteriesAction()
    {
        // action body
    }

    public function batterySwitchStationsAction()
    {
        // action body
    }

    public function chargeSpotsAction()
    {
        // action body
    }

    public function betterPlaceOscarAction()
    {
        // action body
    }

    public function customerCareAction()
    {
        // action body
    }

    public function smartEnergyManagementAction()
    {
        // action body
    }


}















