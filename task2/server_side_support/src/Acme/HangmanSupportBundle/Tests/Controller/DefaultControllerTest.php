<?php

namespace Acme\HangmanSupportBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase {

    public function testIndex() {
        $client = static::createClient();

        $crawler = $client->request('GET', '/hello/Fabien');

        $this->assertTrue($crawler->filter('html:contains("Hello Fabien")')->count() > 0);
    }

    public function testRest() {
        $client = static::createClient();
        $requestContent = json_encode(array(
            'likeStr' => '____ER_',
            'keyArr' => array('A','B','C','D','E','F','G','H','I','J','K','L',
                'M','N','O','P','Q','R','S')
        ));
        var_dump($requestContent);
        //$crawler = $client->request('post', '/hangman/rest/', array(), array(), array(), $requestContent);
        $crawler = $client->request('POST', '/hangman/rest/', array(), array(), array(), 'likeStr=*O*O');
        var_dump($requestContent);
        //echo $crawler->html();
    }
     public function testOutput() {
         $str = "EB_E";
         echo strpos($str, '_');
     }

}
