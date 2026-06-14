import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Users, Globe, Landmark, Shield, Code, MapPin, Target, CheckCircle, Network, Award, Briefcase, UserCheck, GraduationCap, DollarSign } from 'lucide-react';

const GTCXOrgDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    <div key="title" className="h-full flex flex-col justify-center items-center p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      <div className="text-center">
        <div className="text-6xl mb-6">🏛️</div>
        <h1 className="text-5xl font-bold mb-4">
          GTCX Organizational Architecture
        </h1>
        <p className="text-2xl text-emerald-300 mb-8">
          Multilateral Infrastructure: Governance, Entities & Leadership
        </p>
        <div className="flex gap-8 justify-center text-lg text-slate-300">
          <div>Entity Structure</div>
          <div>•</div>
          <div>Executive Team</div>
          <div>•</div>
          <div>Continental Representation</div>
        </div>
      </div>
      <div className="absolute bottom-8 text-sm text-emerald-300">
        Confidential | December 2025
      </div>
    </div>,

    // Slide 2: Not a Company
    <div key="not-company" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Fundamental Principle</div>
        <h1 className="text-4xl font-bold text-slate-900">
          GTCX Is Not a Company
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <div className="text-red-600 font-bold text-lg mb-4">❌ Not This</div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Single company with shareholders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Startup running a pilot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Foreign-owned platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Vendor selling to governments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>CEO makes all decisions</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl">
          <div className="text-emerald-600 font-bold text-lg mb-4">✓ This</div>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Multilateral infrastructure system</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Multiple entities serving different functions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Member-owned exchange</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Governments co-own and operate</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Board-governed, class-balanced</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 text-white p-4 rounded-xl text-center">
        <span className="font-semibold">Like SWIFT. Like DTCC. Like PAPSS.</span>
        <span className="text-slate-300 ml-2">User-owned infrastructure that serves members.</span>
      </div>
    </div>,

    // Slide 3: Entity Structure
    <div key="entities" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Legal Architecture</div>
        <h1 className="text-4xl font-bold text-slate-900">
          Entity Structure
        </h1>
      </div>

      <div className="flex-1">
        {/* Foundation at top */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 border-2 border-purple-600 p-4 rounded-xl text-center w-80">
            <div className="text-purple-600 font-bold text-lg">GTCX Foundation</div>
            <div className="text-sm text-slate-600">Switzerland (Stiftung)</div>
            <div className="text-xs text-slate-500 mt-2">IP ownership • Mission protection • Open source governance</div>
          </div>
        </div>

        {/* Line down */}
        <div className="flex justify-center mb-4">
          <div className="w-0.5 h-8 bg-slate-300"></div>
        </div>

        {/* Two main entities */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="bg-blue-100 border-2 border-blue-600 p-4 rounded-xl text-center w-64">
            <div className="text-blue-600 font-bold">GTCX Technologies</div>
            <div className="text-sm text-slate-600">Portugal (EU)</div>
            <div className="text-xs text-slate-500 mt-2">Core engineering • Protocol dev • R&D</div>
          </div>
          <div className="bg-emerald-100 border-2 border-emerald-600 p-4 rounded-xl text-center w-64">
            <div className="text-emerald-600 font-bold">GTCX Exchange Ltd</div>
            <div className="text-sm text-slate-600">Rwanda (KIFC)</div>
            <div className="text-xs text-slate-500 mt-2">AGX operations • Member governance • Trade</div>
          </div>
        </div>

        {/* Line down */}
        <div className="flex justify-center mb-4">
          <div className="w-96 h-0.5 bg-slate-300"></div>
        </div>

        {/* Regional offices */}
        <div className="flex justify-center gap-4">
          <div className="bg-amber-50 border border-amber-400 p-3 rounded-lg text-center">
            <div className="font-semibold text-sm">West Africa</div>
            <div className="text-xs text-slate-500">Ghana</div>
          </div>
          <div className="bg-amber-50 border border-amber-400 p-3 rounded-lg text-center">
            <div className="font-semibold text-sm">East Africa</div>
            <div className="text-xs text-slate-500">Rwanda</div>
          </div>
          <div className="bg-amber-50 border border-amber-400 p-3 rounded-lg text-center">
            <div className="font-semibold text-sm">Southern Africa</div>
            <div className="text-xs text-slate-500">South Africa</div>
          </div>
          <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg text-center">
            <div className="font-semibold text-sm">MENA Hub</div>
            <div className="text-xs text-slate-500">Dubai</div>
          </div>
        </div>

        {/* Rationale */}
        <div className="mt-6 grid grid-cols-4 gap-4 text-center text-sm">
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="font-semibold text-purple-700">Swiss Foundation</div>
            <div className="text-xs text-slate-600">Neutral IP custody, mission lock</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-semibold text-blue-700">Portugal Tech</div>
            <div className="text-xs text-slate-600">EU jurisdiction, talent, cost</div>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg">
            <div className="font-semibold text-emerald-700">Rwanda Exchange</div>
            <div className="text-xs text-slate-600">African-owned, KIFC, neutral</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="font-semibold text-amber-700">Regional Offices</div>
            <div className="text-xs text-slate-600">Local trust, government ties</div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 4: Governance
    <div key="governance" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Member Governance</div>
        <h1 className="text-4xl font-bold text-slate-900">
          GTCX Exchange — Owned by Members
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Four Member Classes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Producer Class — 25%</div>
                <div className="text-sm text-slate-600">Mining cooperatives, farmer associations</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Buyer Class — 25%</div>
                <div className="text-sm text-slate-600">Refineries, traders, manufacturers</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Government Class — 25%</div>
                <div className="text-sm text-slate-600">National regulators, ministries</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Financial Class — 25%</div>
                <div className="text-sm text-slate-600">Banks, DFIs, trade finance</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Board Composition</h3>
          <div className="bg-slate-50 p-4 rounded-xl mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Independent Chair</span>
                <span className="text-slate-500">Elected by all</span>
              </div>
              <div className="flex justify-between">
                <span>Producer Representatives</span>
                <span className="text-slate-500">2-3 seats</span>
              </div>
              <div className="flex justify-between">
                <span>Buyer Representatives</span>
                <span className="text-slate-500">2-3 seats</span>
              </div>
              <div className="flex justify-between">
                <span>Government Representatives</span>
                <span className="text-slate-500">2-3 seats</span>
              </div>
              <div className="flex justify-between">
                <span>Financial Representatives</span>
                <span className="text-slate-500">2-3 seats</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">9-13 seats</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Constitutional Protections</h3>
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-sm">
            <div className="font-semibold text-red-700 mb-2">Cannot be changed without 75% + class ratification:</div>
            <ul className="space-y-1 text-slate-700">
              <li>• Open source requirement</li>
              <li>• Fee caps</li>
              <li>• Community benefit distribution</li>
              <li>• No single class can exceed 30%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>,

    // Slide 5: Executive Team
    <div key="exec-team" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Leadership</div>
        <h1 className="text-4xl font-bold text-slate-900">
          Founding Executive Team
        </h1>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-emerald-50 border-2 border-emerald-600 p-4 rounded-xl text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Founding Executive</div>
            <div className="text-xs text-slate-500 mt-1">Vision, partnerships, fundraising</div>
            <div className="text-xs text-emerald-600 mt-2 font-medium">You (Amani)</div>
          </div>
          <div className="bg-blue-50 border-2 border-blue-600 p-4 rounded-xl text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-slate-900 text-sm">CTO</div>
            <div className="text-xs text-slate-500 mt-1">Architecture, engineering</div>
            <div className="text-xs text-blue-600 mt-2 font-medium">Portugal (EU)</div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-600 p-4 rounded-xl text-center">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-slate-900 text-sm">COO</div>
            <div className="text-xs text-slate-500 mt-1">Field ops, implementation</div>
            <div className="text-xs text-amber-600 mt-2 font-medium">Africa (Accra/Kigali)</div>
          </div>
          <div className="bg-purple-50 border-2 border-purple-600 p-4 rounded-xl text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Chief Policy Officer</div>
            <div className="text-xs text-slate-500 mt-1">Regulatory, gov relations</div>
            <div className="text-xs text-purple-600 mt-2 font-medium">Africa (rotating)</div>
          </div>
          <div className="bg-slate-50 border-2 border-slate-400 p-4 rounded-xl text-center">
            <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-slate-900 text-sm">General Counsel</div>
            <div className="text-xs text-slate-500 mt-1">Multi-jurisdiction legal</div>
            <div className="text-xs text-slate-600 mt-2 font-medium">Switzerland/Portugal</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900 text-white p-5 rounded-xl">
            <h3 className="font-bold mb-3">Why "Founding Executive" Not CEO?</h3>
            <div className="text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-red-400">CEO:</span>
                <span className="text-slate-300">One person runs it, corporate hierarchy, permanent</span>
              </div>
              <div className="flex gap-2">
                <span className="text-emerald-400">Founding Executive:</span>
                <span className="text-slate-300">Convening role, multilateral coordination, transitional</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-3">Leadership Evolution</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Years 1-3:</span>
                <span className="text-slate-600">Founding Executive leads coalition</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Years 3-5:</span>
                <span className="text-slate-600">Professional management transition</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Year 5+:</span>
                <span className="text-slate-600">Board-appointed Executive Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 6: Continental Representation
    <div key="representation" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">The Commitment</div>
        <h1 className="text-4xl font-bold text-slate-900">
          Engineering Represents the Continent It Serves
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Regional Engineering Hubs</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl">🇵🇹</div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Core Platform — Portugal</div>
                <div className="text-sm text-slate-600">Protocol, architecture, security</div>
              </div>
              <div className="text-blue-600 font-semibold">8-12</div>
            </div>
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <div className="text-2xl">🇬🇭</div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">West Africa — Ghana</div>
                <div className="text-sm text-slate-600">Field apps, USSD, agent tools</div>
              </div>
              <div className="text-emerald-600 font-semibold">6-8</div>
            </div>
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <div className="text-2xl">🇷🇼</div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">East Africa — Rwanda</div>
                <div className="text-sm text-slate-600">Mobile, integrations, localization</div>
              </div>
              <div className="text-emerald-600 font-semibold">6-8</div>
            </div>
            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-lg">
              <div className="text-2xl">🇿🇦</div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">Southern Africa — SA</div>
                <div className="text-sm text-slate-600">Enterprise, government systems</div>
              </div>
              <div className="text-emerald-600 font-semibold">4-6</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Team Composition Target</h3>
          <div className="bg-slate-900 text-white p-5 rounded-xl mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400">
                  <th className="text-left py-1">Region</th>
                  <th className="text-center py-1">Y1</th>
                  <th className="text-center py-1">Y2</th>
                  <th className="text-center py-1">Y3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1">West Africa</td>
                  <td className="text-center">3</td>
                  <td className="text-center">8</td>
                  <td className="text-center">12</td>
                </tr>
                <tr>
                  <td className="py-1">East Africa</td>
                  <td className="text-center">2</td>
                  <td className="text-center">6</td>
                  <td className="text-center">10</td>
                </tr>
                <tr>
                  <td className="py-1">Southern Africa</td>
                  <td className="text-center">1</td>
                  <td className="text-center">4</td>
                  <td className="text-center">8</td>
                </tr>
                <tr>
                  <td className="py-1">Europe (Portugal)</td>
                  <td className="text-center">6</td>
                  <td className="text-center">10</td>
                  <td className="text-center">12</td>
                </tr>
                <tr>
                  <td className="py-1">Other</td>
                  <td className="text-center">3</td>
                  <td className="text-center">6</td>
                  <td className="text-center">8</td>
                </tr>
                <tr className="border-t border-slate-700 font-bold">
                  <td className="py-2">Total</td>
                  <td className="text-center">15</td>
                  <td className="text-center">34</td>
                  <td className="text-center">50</td>
                </tr>
                <tr className="text-emerald-400">
                  <td className="py-1">% African</td>
                  <td className="text-center">40%</td>
                  <td className="text-center">53%</td>
                  <td className="text-center">60%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-600 text-white p-4 rounded-xl text-center">
            <div className="text-2xl font-bold">Majority African Engineering</div>
            <div className="text-emerald-100">by Year 2</div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 7: Hiring Principles
    <div key="hiring" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Talent Strategy</div>
        <h1 className="text-4xl font-bold text-slate-900">
          How We Build Representative Teams
        </h1>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Hiring Principles</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Local-First Hiring</div>
                <div className="text-sm text-slate-600">Hire in-region for regional work</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Diaspora Recruitment</div>
                <div className="text-sm text-slate-600">Africans abroad who want to return</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">University Partnerships</div>
                <div className="text-sm text-slate-600">Ashesi, ALU, AIMS, Strathmore, UCT</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Technical Apprenticeships</div>
                <div className="text-sm text-slate-600">Train local talent alongside senior engineers</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Network className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-900">Remote-Capable</div>
                <div className="text-sm text-slate-600">Distributed team, not HQ-centric</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">Compensation Philosophy</h3>
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
              <div className="font-semibold text-emerald-700">Regional Parity</div>
              <div className="text-sm text-slate-600">Top 25-30% of local market, not race-to-bottom</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="font-semibold text-blue-700">Equity Participation</div>
              <div className="text-sm text-slate-600">All employees get ownership stake</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <div className="font-semibold text-amber-700">Cost-of-Living Adjustment</div>
              <div className="text-sm text-slate-600">Fair pay for where you live</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <div className="font-semibold text-purple-700">No "Expat Premium"</div>
              <div className="text-sm text-slate-600">Same role = same equity, adjusted base</div>
            </div>
          </div>

          <div className="mt-4 bg-slate-900 text-white p-4 rounded-xl">
            <div className="text-sm">
              <span className="text-emerald-400 font-semibold">Why this matters:</span>
              <span className="text-slate-300 ml-2">Engineers who understand offline-first, USSD interfaces, and producer communities build better products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 8: Champions Needed
    <div key="champions" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Coalition Building</div>
        <h1 className="text-4xl font-bold text-slate-900">
          Champions We Need
        </h1>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-emerald-50 border-2 border-emerald-600 p-5 rounded-xl">
            <div className="text-emerald-600 font-bold text-lg mb-3">Tier 1: Institutional</div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">AFREXIMBANK Champion</div>
                <div className="text-slate-500">Convening power, PAPSS integration</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">AfDB Champion</div>
                <div className="text-slate-500">DFI credibility, funding</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">AU/AfCFTA Champion</div>
                <div className="text-slate-500">Continental endorsement</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Government Minister</div>
                <div className="text-slate-500">First mover credibility</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-600 p-5 rounded-xl">
            <div className="text-blue-600 font-bold text-lg mb-3">Tier 2: Industry</div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Refinery Champion</div>
                <div className="text-slate-500">Buyer demand signal</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Cooperative Champion</div>
                <div className="text-slate-500">Producer legitimacy</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Mining Industry Champion</div>
                <div className="text-slate-500">Sector credibility</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-600 p-5 rounded-xl">
            <div className="text-purple-600 font-bold text-lg mb-3">Tier 3: Advisory Board</div>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Former African Finance Minister</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">African Fintech Founder</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">Former LBMA Executive</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-semibold">DFI Africa Director</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-xl">
          <h3 className="font-bold mb-3">Priority Sequence</h3>
          <div className="flex gap-4">
            <div className="flex-1 text-center p-3 bg-slate-800 rounded-lg">
              <div className="text-emerald-400 font-bold">#1</div>
              <div className="text-sm">AFREXIMBANK intro</div>
            </div>
            <div className="text-slate-500">→</div>
            <div className="flex-1 text-center p-3 bg-slate-800 rounded-lg">
              <div className="text-emerald-400 font-bold">#2</div>
              <div className="text-sm">CTO / Tech co-founder</div>
            </div>
            <div className="text-slate-500">→</div>
            <div className="flex-1 text-center p-3 bg-slate-800 rounded-lg">
              <div className="text-emerald-400 font-bold">#3</div>
              <div className="text-sm">Ghana minister</div>
            </div>
            <div className="text-slate-500">→</div>
            <div className="flex-1 text-center p-3 bg-slate-800 rounded-lg">
              <div className="text-emerald-400 font-bold">#4</div>
              <div className="text-sm">Advisory anchor</div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 9: Next 90 Days
    <div key="90days" className="h-full flex flex-col p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Immediate Action</div>
        <h1 className="text-4xl font-bold">
          Next 90 Days
        </h1>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
            <div className="text-emerald-400 font-bold text-lg mb-3">Week 1-2</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Identify warm intro to AFREXIMBANK</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Begin CTO search</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
            <div className="text-emerald-400 font-bold text-lg mb-3">Week 3-6</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Ghana minister engagement (Dr. Akpah)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Rwanda engagement (Mines Board)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
            <div className="text-emerald-400 font-bold text-lg mb-3">Week 6-10</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Advisory board recruitment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Botswana + Zambia outreach</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur p-5 rounded-xl">
            <div className="text-emerald-400 font-bold text-lg mb-3">Week 8-12</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Mining Indaba preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Coalition commitment locked</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-emerald-600 p-6 rounded-xl text-center">
          <div className="text-2xl font-bold mb-2">Mining Indaba 2026 (February)</div>
          <div className="text-emerald-100">6 ministers on stage. Coalition launch announcement.</div>
        </div>
      </div>
    </div>,

    // Slide 10: Summary
    <div key="summary" className="h-full flex flex-col p-10 bg-white">
      <div className="mb-6">
        <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Summary</div>
        <h1 className="text-4xl font-bold text-slate-900">
          The Organization
        </h1>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who owns the IP?</span>
              <span className="text-emerald-600">GTCX Foundation (Swiss)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who builds technology?</span>
              <span className="text-emerald-600">GTCX Technologies (Portugal)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who operates the exchange?</span>
              <span className="text-emerald-600">GTCX Exchange (Rwanda)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who runs each SGX?</span>
              <span className="text-emerald-600">Each government</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who leads initially?</span>
              <span className="text-emerald-600">Founding Executive + team</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who governs long-term?</span>
              <span className="text-emerald-600">Member-elected board</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Where is engineering?</span>
              <span className="text-emerald-600">Portugal + Ghana + Rwanda + SA</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
              <span className="font-medium">Who champions this?</span>
              <span className="text-emerald-600">AFREXIMBANK + ministers + board</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-900 text-white p-6 rounded-xl text-center">
          <div className="text-2xl font-bold mb-2">Multilateral Infrastructure</div>
          <div className="text-slate-300">Built by Africa. Owned by Africa. Governed by Africa.</div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-slate-500">
        <div>Amani | Founding Executive, GTCX</div>
        <div>Confidential | December 2025</div>
      </div>
    </div>
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col">
      {/* Slide container */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex justify-between items-center bg-white border-t">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-8 right-8 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default GTCXOrgDeck;
