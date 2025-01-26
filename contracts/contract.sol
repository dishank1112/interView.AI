// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InterviewScheduler {
    address public owner;
    uint256 public interviewFee; // 
    struct Interview {
        string jobRole;
        uint256 date;
        uint256 time;
        address user;
    }

    mapping(address => Interview) public scheduledInterviews;

    event InterviewScheduled(address indexed user, string jobRole, uint256 date, uint256 time);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Modifier to ensure that the user pays the required fee
    modifier paidEnough() {
        require(msg.value >= interviewFee, "Not enough Ether sent for the interview fee");
        _;
    }

    // Constructor to initialize the contract with the owner and interview fee
    constructor(uint256 _interviewFee) {
        owner = msg.sender;
        interviewFee = _interviewFee;
    }

    // Function to schedule an interview (only if the user sends enough Ether)
    function scheduleInterview(string memory _jobRole, uint256 _date, uint256 _time) public payable paidEnough {
        // Check if the user has already scheduled an interview
        require(scheduledInterviews[msg.sender].user == address(0), "You have already scheduled an interview");

        // Store the interview details
        scheduledInterviews[msg.sender] = Interview({
            jobRole: _jobRole,
            date: _date,
            time: _time,
            user: msg.sender
        });

        // Emit event that an interview has been scheduled
        emit InterviewScheduled(msg.sender, _jobRole, _date, _time);

        // Transfer the payment to the owner (platform)
        payable(owner).transfer(msg.value);
    }

    // Function to view the interview details
    function viewInterview(address user) public view returns (string memory jobRole, uint256 date, uint256 time) {
        Interview memory interview = scheduledInterviews[user];
        return (interview.jobRole, interview.date, interview.time);
    }

    // Function to change the interview fee (only the owner can do this)
    function changeInterviewFee(uint256 _newFee) public onlyOwner {
        interviewFee = _newFee;
    }

    // Function to withdraw contract balance (only the owner can do this)
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
