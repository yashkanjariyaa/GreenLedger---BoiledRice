import 'package:animate_do/animate_do.dart';
import 'package:green_ledger/ui/features/flutter_wallet_pages/contact.dart';
import 'package:green_ledger/ui/features/flutter_wallet_pages/submit_kyc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_advanced_drawer/flutter_advanced_drawer.dart';
import 'package:iconsax/iconsax.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:green_ledger/ui/features/flutter_wallet_pages/bank_records.dart';

void main() {
  runApp(const MaterialApp(
    home: FlutterWallet(),
    debugShowCheckedModeBanner: false,
  ));
}

class FlutterWallet extends StatefulWidget {
  const FlutterWallet({Key? key}) : super(key: key);

  @override
  _FlutterWalletState createState() => _FlutterWalletState();
}

class _FlutterWalletState extends State<FlutterWallet> {
  late ScrollController _scrollController;
  bool _isScrolled = false;
  String username = "Error Fetching";
  String rank = "Customer";

  final List<dynamic> _services = [
    ['Submit KYC', Iconsax.document_upload, Colors.pink],
    ['Transfer', Iconsax.export_1, Colors.blue],
    ['Bank records', Iconsax.wallet_3, Colors.orange],
    ['More', Iconsax.more, Colors.green],
  ];

  final List<dynamic> _transactions = [
    [
      'Amazon',
      'https://img.icons8.com/color/2x/amazon.png',
      '6:25pm',
      '\$8.90'
    ],
    [
      'Cash from ATM',
      'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/2x/external-atm-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png',
      '5:50pm',
      '\$200.00'
    ],
    [
      'Netflix',
      'https://img.icons8.com/color-glass/2x/netflix.png',
      '2:22pm',
      '\$13.99'
    ],
    [
      'Apple Store',
      'https://img.icons8.com/color/2x/mac-os--v2.gif',
      '6:25pm',
      '\$4.99'
    ],
    [
      'Cash from ATM',
      'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/2x/external-atm-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png',
      '5:50pm',
      '\$200.00'
    ],
    [
      'Netflix',
      'https://img.icons8.com/color-glass/2x/netflix.png',
      '2:22pm',
      '\$13.99'
    ]
  ];

  @override
  void initState() {
    _scrollController = ScrollController();
    _scrollController.addListener(_listenToScrollChange);
    getUsername();
    super.initState();
  }

  void getUsername() async {
    var prefs = await SharedPreferences.getInstance();
    username = prefs.getString('secure_bank_username') ?? "Error Fetching";
    rank = prefs.getString('rank') ?? "Customer";
    if (rank == "Admin") {
      _services.add(['Bank records', Iconsax.tick_circle, Colors.red]);
    }
  }

  void _listenToScrollChange() {
    if (_scrollController.offset >= 100.0) {
      setState(() {
        _isScrolled = true;
      });
    } else {
      setState(() {
        _isScrolled = false;
      });
    }
  }

  final _advancedDrawerController = AdvancedDrawerController();

  @override
  Widget build(BuildContext context) {
    return AdvancedDrawer(
      backdropColor: Colors.grey.shade900,
      controller: _advancedDrawerController,
      animationCurve: Curves.easeInOut,
      animationDuration: const Duration(milliseconds: 300),
      animateChildDecoration: true,
      rtlOpening: false,
      disabledGestures: false,
      childDecoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Colors.grey.shade900,
            blurRadius: 20.0,
            spreadRadius: 5.0,
            offset: const Offset(-20.0, 0.0),
          ),
        ],
        borderRadius: BorderRadius.circular(30),
      ),
      drawer: SafeArea(
        child: Container(
          padding: const EdgeInsets.only(top: 20),
          child: ListTileTheme(
            textColor: Colors.white,
            iconColor: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                    width: 80.0,
                    height: 80.0,
                    margin: const EdgeInsets.only(
                      left: 20,
                      top: 24.0,
                    ),
                    clipBehavior: Clip.antiAlias,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade800,
                      shape: BoxShape.circle,
                    ),
                    child: Image.asset('assets/images/avatar-1.png')),
                const SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 30.0),
                  child: Text(
                    username,
                    style: const TextStyle(
                        color: Colors.white, fontWeight: FontWeight.w600),
                  ),
                ),
                const Spacer(),
                Divider(
                  color: Colors.grey.shade800,
                ),
                ListTile(
                  onTap: () {},
                  leading: const Icon(Iconsax.home),
                  title: const Text('Dashboard'),
                ),
                ListTile(
                  onTap: () {},
                  leading: const Icon(Iconsax.chart_2),
                  title: const Text('Analytics'),
                ),
                ListTile(
                  onTap: () {},
                  leading: const Icon(Iconsax.profile_2user),
                  title: const Text('Contacts'),
                ),
                const SizedBox(
                  height: 50,
                ),
                Divider(color: Colors.grey.shade800),
                ListTile(
                  onTap: () {},
                  leading: const Icon(Iconsax.setting_2),
                  title: const Text('Settings'),
                ),
                ListTile(
                  onTap: () {},
                  leading: const Icon(Iconsax.support),
                  title: const Text('Support'),
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Text(
                    'Version 1.0.0',
                    style: TextStyle(color: Colors.grey.shade500),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
      child: Scaffold(
          backgroundColor: Colors.grey.shade100,
          body: CustomScrollView(controller: _scrollController, slivers: [
            SliverAppBar(
              expandedHeight: 250.0,
              elevation: 0,
              pinned: true,
              stretch: true,
              toolbarHeight: 80,
              backgroundColor: Colors.white,
              leading: IconButton(
                color: Colors.black,
                onPressed: _handleMenuButtonPressed,
                icon: ValueListenableBuilder<AdvancedDrawerValue>(
                  valueListenable: _advancedDrawerController,
                  builder: (_, value, __) {
                    return AnimatedSwitcher(
                      duration: const Duration(milliseconds: 250),
                      child: Icon(
                        value.visible ? Iconsax.close_square : Iconsax.menu,
                        key: ValueKey<bool>(value.visible),
                      ),
                    );
                  },
                ),
              ),
              actions: [
                IconButton(
                  icon: Icon(Iconsax.notification, color: Colors.grey.shade700),
                  onPressed: () {},
                ),
                IconButton(
                  icon: Icon(Iconsax.more, color: Colors.grey.shade700),
                  onPressed: () {},
                ),
              ],
              shape: const RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(40),
                  bottomRight: Radius.circular(40),
                ),
              ),
              centerTitle: true,
              title: AnimatedOpacity(
                opacity: _isScrolled ? 1.0 : 0.0,
                duration: const Duration(milliseconds: 500),
                child: Column(
                  children: [
                    const Text(
                      '\$ 1,840.00',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                      width: 30,
                      height: 4,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade800,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                  ],
                ),
              ),
              flexibleSpace: FlexibleSpaceBar(
                collapseMode: CollapseMode.pin,
                titlePadding: const EdgeInsets.only(left: 20, right: 20),
                title: AnimatedOpacity(
                  duration: const Duration(milliseconds: 500),
                  opacity: _isScrolled ? 0.0 : 1.0,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      FadeIn(
                        duration: const Duration(milliseconds: 500),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '\$',
                              style: TextStyle(
                                  color: Colors.grey.shade800, fontSize: 22),
                            ),
                            const SizedBox(
                              width: 3,
                            ),
                            const Text(
                              '1,840.00',
                              style: TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      FadeIn(
                        duration: const Duration(milliseconds: 500),
                        child: MaterialButton(
                          height: 30,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 20, vertical: 0),
                          onPressed: () {},
                          color: Colors.transparent,
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            side: BorderSide(
                                color: Colors.grey.shade300, width: 1),
                            borderRadius: BorderRadius.circular(30),
                          ),
                          child: const Text(
                            'Add Money',
                            style: TextStyle(color: Colors.black, fontSize: 10),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        width: 30,
                        height: 3,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade800,
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      const SizedBox(
                        height: 8,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SliverList(
                delegate: SliverChildListDelegate([
              const SizedBox(
                height: 20,
              ),
              Container(
                padding: const EdgeInsets.only(top: 20),
                height: 115,
                width: double.infinity,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _services.length,
                  itemBuilder: (context, index) {
                    return FadeInDown(
                      duration: Duration(milliseconds: (index + 1) * 100),
                      child: AspectRatio(
                        aspectRatio: 1,
                        child: GestureDetector(
                          onTap: () {
                            if (_services[index][0] == 'Submit KYC') {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => const SubmitKyc()));
                            }
                            if (_services[index][0] == 'Bank records') {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => BankRecords()));
                            }
                            if (_services[index][0] == 'Transfer') {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          const ContactPage()));
                            }
                          },
                          child: Column(
                            children: [
                              Container(
                                width: 60,
                                height: 60,
                                decoration: BoxDecoration(
                                  color: Colors.grey.shade900,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Center(
                                  child: Icon(
                                    _services[index][1],
                                    color: Colors.white,
                                    size: 25,
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                _services[index][0],
                                style: TextStyle(
                                    color: Colors.grey.shade800, fontSize: 12),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ])),
            SliverFillRemaining(
              child: Container(
                padding: const EdgeInsets.only(left: 20, right: 20, top: 30),
                child: Column(
                  children: [
                    FadeInDown(
                      duration: const Duration(milliseconds: 500),
                      child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Today',
                              style: TextStyle(
                                  color: Colors.grey.shade800,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600),
                            ),
                            const SizedBox(
                              width: 10,
                            ),
                            const Text('\$ 1,840.00',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                )),
                          ]),
                    ),
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.only(top: 20),
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _transactions.length,
                        itemBuilder: (context, index) {
                          return FadeInDown(
                            duration: const Duration(milliseconds: 500),
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 10),
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20, vertical: 10),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(15),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.shade200,
                                    blurRadius: 5,
                                    spreadRadius: 1,
                                    offset: const Offset(0, 6),
                                  ),
                                ],
                              ),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      Image.network(
                                        _transactions[index][1],
                                        width: 50,
                                        height: 50,
                                      ),
                                      const SizedBox(
                                        width: 15,
                                      ),
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            _transactions[index][0],
                                            style: TextStyle(
                                                color: Colors.grey.shade900,
                                                fontWeight: FontWeight.w500,
                                                fontSize: 14),
                                          ),
                                          const SizedBox(
                                            height: 5,
                                          ),
                                          Text(
                                            _transactions[index][2],
                                            style: TextStyle(
                                                color: Colors.grey.shade500,
                                                fontSize: 12),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                  Text(
                                    _transactions[index][3],
                                    style: TextStyle(
                                        color: Colors.grey.shade800,
                                        fontSize: 16,
                                        fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    )
                  ],
                ),
              ),
            )
          ])),
    );
  }

  void _handleMenuButtonPressed() {
    _advancedDrawerController.showDrawer();
  }
}
