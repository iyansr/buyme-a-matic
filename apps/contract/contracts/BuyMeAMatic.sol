// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

contract BuyMeAMatic {
	struct Memo {
		address from;
		uint256 timestamp;
		string name;
		string message;
		bool hideMessage;
		bool hideName;
		bool hideAddress;
	}

	event NewMemo(
		address indexed from,
		uint256 timestamp,
		string name,
		string message,
		bool hideMessage,
		bool hideName,
		bool hideAddress
	);

	address payable public owner;

	modifier onlyOwner() {
		require(msg.sender == owner, "Should be owner");
		_;
	}

	Memo[] memos;

	constructor() {
		owner = payable(msg.sender);
	}

	function getMemos() public view returns (Memo[] memory) {
		return memos;
	}

	function buyMatic(
		string memory _name,
		string memory _message,
		bool _hideMessage,
		bool _hideName,
		bool _hideAddress
	) public payable {
		require(msg.value > 0, "Cannot buy Matic for free");
		memos.push(
			Memo(
				msg.sender,
				block.timestamp,
				_name,
				_message,
				_hideMessage,
				_hideName,
				_hideAddress
			)
		);
		emit NewMemo(
			msg.sender,
			block.timestamp,
			_name,
			_message,
			_hideMessage,
			_hideName,
			_hideAddress
		);
	}

	function withDrawTips() public onlyOwner {
		require(owner.send(address(this).balance));
	}
}
