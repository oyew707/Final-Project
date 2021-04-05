import random
from copy import deepcopy
from Player import *


def max_val(board, player):
    if board.terminal_test() is not None:
        return board.utility()
    actions = board.get_action()
    ls = []
    for i in actions:
        newboard = deepcopy(board)
        newboard.results(i, player)
        next_t = "y" if player == "x" else "x"
        util = min_val(newboard, next_t)
        ls.append(util)
        max_utility = max(ls)
    index = [i for i, x in enumerate(ls) if x == max_utility]
    board.best_actions = [actions[i] for i in index]
    # print([actions[i] for i in index])
    rand_i = random.choice(index)
    board.best_action = actions[rand_i]
    return max_utility*len(index)


def min_val(board, player):
    if board.terminal_test() is not None:
        return board.utility()
    actions = board.get_action()
    ls = []
    for i in actions:
        newboard = deepcopy(board)
        newboard.results(i, player)
        next_t = "y" if player == "x" else "x"
        util = max_val(newboard, next_t)
        ls.append(util)
        min_utility = min(ls)
    index = [i for i, x in enumerate(ls) if x == min_utility]
    rand_i = random.choice(index)
    board.best_actions = [actions[i] for i in index]
    # print()
    # print(board.state)
    # print(actions)
    # print([actions[i] for i in index])
    board.best_action = actions[rand_i]
    return min_utility*len(index)

def train(player_1, player_2, epochs=500, verbose = True):
    assert player_1.PLAYER_TYPE == "RL" or player_1.PLAYER_TYPE == "Minimax", "Only train with RL or Minimax"
    assert player_2.PLAYER_TYPE == "RL" or player_2.PLAYER_TYPE == "Minimax", "Only train with RL or Minimax"
    turn = 1
    win = 0
    loss = 0
    tie = 0
    for j in range(epochs):
        if verbose: print("Round ", j)
        board = tic_tac_toe(player_1.symbol, player_2.symbol, turn)
        while True:
            if verbose:
                for i in board.state:
                    print(i)
            actions = board.get_action()
            if board.turn == 1:  # player 1
                x_act = player_1.nextAction(board)
                new_state = board.results(x_act, player_1.symbol)
                if player_1.PLAYER_TYPE == "RL":
                    player_1.previous_states.append(str(new_state))
                    if board.terminal_test() is not None:  # i.e. game over
                        player_1.rewards(board)
                        player_1.previous_states = []
                        if player_2.PLAYER_TYPE != "Minimax": player_2.rewards(board)
                        if player_2.PLAYER_TYPE != "Minimax": player_2.previous_states = []
                        break
                elif board.terminal_test() is not None:
                    if player_2.PLAYER_TYPE != "Minimax": player_2.rewards(board)
                    if player_2.PLAYER_TYPE != "Minimax": player_2.previous_states = []
                    break

            else:
                y_act = player_2.nextAction(board)
                new_state = board.results(y_act, player_2.symbol)
                if player_2.PLAYER_TYPE == "RL":
                    player_2.previous_states.append(str(new_state))
                    if board.terminal_test() is not None:  # i.e. game over
                        player_2.rewards(board)
                        player_2.previous_states = []
                        if player_1.PLAYER_TYPE != "Minimax": player_1.rewards(board)
                        if player_1.PLAYER_TYPE != "Minimax": player_1.previous_states = []
                        break
                elif board.terminal_test() is not None:
                    if player_1.PLAYER_TYPE != "Minimax": player_1.rewards(board)
                    if player_1.PLAYER_TYPE != "Minimax": player_1.previous_states = []
                    break


        if player_1.PLAYER_TYPE != "Minimax" and player_2.PLAYER_TYPE == "RL": player_2.exponential_decay(j)
        if player_2.PLAYER_TYPE != "Minimax" and player_1.PLAYER_TYPE == "RL": player_1.exponential_decay(j)
        w = board.utility()
        if verbose: print("Winner is:", w)
        if w == 1: win+=1
        elif w == -1: loss+=1
        else: tie +=1
        # input()
        turn *= -1
        if j == epochs-1: break
    print("Win: ", win, " Loss: ", loss, " Tie:", tie)
    return player_1, player_2


def create_board(board):
    """
    -------------------------------------------------------
    [Function Description]
    -------------------------------------------------------
    Parameters:
       [parameter name - parameter description (parameter type and constraints)]
    Returns:
       [return value name - return value description (return value type)]
    -------------------------------------------------------
    """
    l = board.strip().split("/")
    for j in range(len(l)):
        if l[j] == "n":
            l[j] = None
    return [l[i:i+3] for i in range(0, len(l), 3)]
