<?php

namespace Acme\HangmanSupportBundle\Controller;

use Acme\HangmanSupportBundle\Entity\Synet;
use Acme\HangmanSupportBundle\Entity\SynetRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('AcmeHangmanSupportBundle:Default:index.html.twig', array('name' => $name));
    }
    
    public function restAction(Request $request) {
        if ($request->getMethod()=='GET') {
            return new Response('GET NOT SUPPORTED');
        }
        $parameters = json_decode($request->getContent());
        $likeStr = $parameters->likeStr;
        $firstPos = strpos($likeStr, '*');
        $keyArr = $parameters->keyArr;
        $resultArray = array();
        foreach ($keyArr as $value) {
            $resultArray[$value] = 0;
        }
        // 做数据库查询
        $synetRespo = SynetRepository::getInstance($this->getDoctrine()->getManager());
        /* @var $synetRespo EntityRepository|SynetRepository */
        $resultSet = $synetRespo->likeSearch(str_replace('*', '_', $likeStr));
        /* @var $resultSet ArrayCollection */
        $resultSetArr = array();
        foreach ($resultSet as $value) {
            /* @var $value Synet */
            if (in_array($value->getWord(), $resultSetArr)) {
                continue;
            }  else {
                array_push($resultSetArr, $value->getWord());
                $strToArr = str_split($value->getWord());
                foreach ($strToArr as $char) {
                    if (!array_key_exists($char, $resultArray)) {
                        continue(2);
                    }
                }
                $resultArray[$strToArr[$firstPos]] ++;
            }
        }
        arsort($resultArray);
        return new Response(json_encode(array_keys($resultArray)));
    }
}
