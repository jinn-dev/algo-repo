package net.acmicpc;

import java.util.Scanner;

public class P5543 {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);

		int burger = 1000000000;
		int drink = 1000000000;

		for (int i = 0; i < 3; i++) {
			int value = in.nextInt();
			burger = (burger > value) ? value : burger;
		}

		for (int i = 0; i < 2; i++) {
			int value = in.nextInt();
			drink = (drink > value) ? value : drink;
		}

		System.out.println(burger + drink - 50);
	}
}
