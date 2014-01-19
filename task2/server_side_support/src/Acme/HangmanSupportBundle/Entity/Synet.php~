<?php

namespace Acme\HangmanSupportBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Synet
 *
 * @ORM\Table(name="wn_synset")
 * @ORM\Entity(repositoryClass="Acme\HangmanSupportBundle\Entity\SynetRepository")
 */
class Synet
{
    /**
     * @var integer
     *
     * @ORM\Column(name="synset_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="word", type="string", length=255)
     */
    private $word;

    /**
     * @var integer
     *
     * @ORM\Column(name="w_num", type="integer")
     */
    private $num;

    /**
     * @var string
     *
     * @ORM\Column(name="ss_type", type="string", length=5)
     */
    private $type;

    /**
     * @var integer
     *
     * @ORM\Column(name="sense_number", type="integer")
     */
    private $senseNumber;

    /**
     * @var integer
     *
     * @ORM\Column(name="tag_count", type="integer")
     */
    private $tagCount;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set word
     *
     * @param string $word
     * @return Synet
     */
    public function setWord($word)
    {
        $this->word = $word;
    
        return $this;
    }

    /**
     * Get word
     *
     * @return string 
     */
    public function getWord()
    {
        return $this->word;
    }

    /**
     * Set num
     *
     * @param integer $num
     * @return Synet
     */
    public function setNum($num)
    {
        $this->num = $num;
    
        return $this;
    }

    /**
     * Get num
     *
     * @return integer 
     */
    public function getNum()
    {
        return $this->num;
    }

    /**
     * Set type
     *
     * @param string $type
     * @return Synet
     */
    public function setType($type)
    {
        $this->type = $type;
    
        return $this;
    }

    /**
     * Get type
     *
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set senseNumber
     *
     * @param integer $senseNumber
     * @return Synet
     */
    public function setSenseNumber($senseNumber)
    {
        $this->senseNumber = $senseNumber;
    
        return $this;
    }

    /**
     * Get senseNumber
     *
     * @return integer 
     */
    public function getSenseNumber()
    {
        return $this->senseNumber;
    }

    /**
     * Set tagCount
     *
     * @param integer $tagCount
     * @return Synet
     */
    public function setTagCount($tagCount)
    {
        $this->tagCount = $tagCount;
    
        return $this;
    }

    /**
     * Get tagCount
     *
     * @return integer 
     */
    public function getTagCount()
    {
        return $this->tagCount;
    }
}