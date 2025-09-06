// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WeClubDAO {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 voteCount;
        uint256 createdAt;
        address proposer;
        bool executed;
        mapping(address => bool) voters;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public memberVotingPower;
    
    // Event'ler
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, uint256 votingPower);
    event ProposalExecuted(uint256 indexed proposalId);
    event MemberAdded(address indexed member, uint256 votingPower);

    modifier onlyMember() {
        require(memberVotingPower[msg.sender] > 0, "Not a DAO member");
        _;
    }

    constructor() {
        // Kontrat sahibine başlangıç oylama gücü ver
        memberVotingPower[msg.sender] = 1;
        emit MemberAdded(msg.sender, 1);
    }

    function addMember(address member, uint256 votingPower) public {
        require(memberVotingPower[msg.sender] > 0, "Only members can add new members");
        memberVotingPower[member] = votingPower;
        emit MemberAdded(member, votingPower);
    }

    function createProposal(string memory title, string memory description) public onlyMember {
        uint256 proposalId = proposalCount++;
        
        Proposal storage newProposal = proposals[proposalId];
        newProposal.id = proposalId;
        newProposal.title = title;
        newProposal.description = description;
        newProposal.voteCount = 0;
        newProposal.createdAt = block.timestamp;
        newProposal.proposer = msg.sender;
        newProposal.executed = false;
        
        emit ProposalCreated(proposalId, msg.sender, title);
    }

    function vote(uint256 proposalId) public onlyMember {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal already executed");
        
        uint256 votingPower = memberVotingPower[msg.sender];
        proposal.voters[msg.sender] = true;
        proposal.voteCount += votingPower;
        
        emit VoteCast(proposalId, msg.sender, votingPower);
    }

    function executeProposal(uint256 proposalId) public onlyMember {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount >= 3, "Not enough votes"); // Basit çoğunluk kuralı
        
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    function getProposal(uint256 proposalId) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        uint256 voteCount,
        uint256 createdAt,
        address proposer,
        bool executed
    ) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.voteCount,
            proposal.createdAt,
            proposal.proposer,
            proposal.executed
        );
    }
    
    function hasVoted(uint256 proposalId, address voter) public view returns (bool) {
        require(proposalId < proposalCount, "Proposal does not exist");
        return proposals[proposalId].voters[voter];
    }
    
    function getAllProposals() public view returns (
        uint256[] memory ids,
        string[] memory titles,
        uint256[] memory voteCounts,
        bool[] memory executedStatuses
    ) {
        ids = new uint256[](proposalCount);
        titles = new string[](proposalCount);
        voteCounts = new uint256[](proposalCount);
        executedStatuses = new bool[](proposalCount);
        
        for (uint256 i = 0; i < proposalCount; i++) {
            ids[i] = proposals[i].id;
            titles[i] = proposals[i].title;
            voteCounts[i] = proposals[i].voteCount;
            executedStatuses[i] = proposals[i].executed;
        }
        
        return (ids, titles, voteCounts, executedStatuses);
    }
}
